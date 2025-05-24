import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!category) return;

        // Axios request
        axios.get(`http://localhost:8080/product`, {
            params: { category: category.toUpperCase() }
        })
        .then(res => {
            setProducts(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching products:', err);
            setLoading(false);
        });
    }, [category]);

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <h2>Products in category: {category}</h2>
            {products.length === 0 && <p>No products found</p>}
            <ul>
                {products.map(prod => (
                    <li key={prod.id}>{prod.name} - ${prod.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
