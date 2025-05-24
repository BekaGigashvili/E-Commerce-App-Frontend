import React, { useState } from 'react';
import '../styles/CarouselComponent.scss';
import slide1 from '../assets/images/final.png'
import { useEffect } from 'react';
import axios from 'axios';


const images = [slide1, '/images/slide2.jpg', '/images/slide3.jpg'];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/product/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel">
      <div className="carousel-search">
        <select className="category-select">
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0) + cat.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Search..." />
        <button>Go</button>
      </div>
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, idx) => (
          <div className="carousel-item" key={idx}>
            <img src={src} alt={`Slide ${idx + 1}`} />
            <div className="carousel-overlay">
              <button>დაიწყე შოპინგი</button>
            </div>
          </div>
        ))}
      </div>
      <button className="nav-button left" onClick={goToPrev}>&#10094;</button>
      <button className="nav-button right" onClick={goToNext}>&#10095;</button>
      <div className="dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
