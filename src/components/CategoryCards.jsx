import '../styles/CategoryCards.scss';
import { useNavigate } from 'react-router-dom';

const CategoryCards = ({ categories }) => {
    const navigate = useNavigate();

    if (!categories || categories.length === 0) return <p>Loading categories...</p>;

    const handleCategoryClick = (category) => {
        // Redirect to search page with category as URL param
        navigate(`/search/${category.toUpperCase()}`);
    };

    return (
        <div className='cards-wrapper'>
            <h1>აირჩიე კატეგორია</h1>
            <div className="category-cards">
                {categories.map((category, idx) => (
                    <div className="category-card" onClick={() => handleCategoryClick(category)} key={category + idx}>
                        <h3>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCards;
