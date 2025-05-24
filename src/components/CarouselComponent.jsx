import React, { useState, useEffect } from 'react';
import '../styles/CarouselComponent.scss';
import slide1 from '../assets/images/first.png';
import slide2 from '../assets/images/second.png';
import slide3 from '../assets/images/third.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryCards from './CategoryCards';
import cartIcon from '../assets/images/cart.png'

const images = [slide1, slide2, slide3];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) setIsLoggedIn(true);

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

  const handleLogout = async () => {
    const token = localStorage.getItem('jwtToken');

    try {
      await axios.post(
        'http://localhost:8080/user/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      localStorage.removeItem('jwtToken');
      setIsLoggedIn(false);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="carousel">
      <div className="top-buttons">
        {!isLoggedIn ? (
          <>
            <button className="btn left-btn" onClick={() => navigate('/signin')}>ავტორიზაცია</button>
            <button className="btn right-btn" onClick={() => navigate('/register')}>რეგისტრაცია</button>
          </>
        ) : (
          <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>

      <div className="header-wrapper">
        <div className="header-bar">
          <a href="#">ყველაზე გაყიდვადი</a>
          <a href="#">საჩუქრების იდეები</a>
          <a href="#">ახლახანს გამოსული</a>
          <a href="#">დღევანდელი შეთავაზებები</a>
          <a href="#">მომხმარებელთა დახმარება</a>
        </div>
      </div>

      <div className="carousel-search">
        <a href="/" className="ecommerce-home">მთავარი</a>
        <select className="category-select">
          <option value="">ყველა კატეგორია</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0) + cat.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <input type="text" placeholder="მოძებნე..." />
        <button>ძებნა</button>

        {isLoggedIn && (
          <div className="cart-icon" onClick={() => navigate('/cart')}>
            {<img src={cartIcon} alt="Cart" />}
          </div>
        )}
      </div>

      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, idx) => (
          <div className="carousel-item" key={idx}>
            <img src={src} alt={`Slide ${idx + 1}`} />
            <div className="carousel-overlay">
              <button onClick={() => {
                const section = document.getElementById('category-section');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}>დაიწყე შოპინგი</button>
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
      <div id='category-section'>
        <CategoryCards categories={categories} />
      </div>

    </div>
  );
};

export default CarouselComponent;
