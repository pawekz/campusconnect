import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function ViewProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then((data) => {
            if (data) {
                console.log('Products loaded:', data);
            } else {
                console.log('Failed to load products');
            }
        });
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products/getAllProducts', {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer <token>' // Uncomment if an auth token is required
                },
            });
            setProducts(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error.message);
            if (error.response) {
                console.error('Server responded with:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Request error:', error.message);
            }
            return null;
        }
    };

    return (
        <div>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <div>
                            <p><strong>Title:</strong> {product.product_title}</p>
                            <p><strong>Description:</strong> {product.product_description}</p>
                            <p><strong>Price:</strong> {product.product_price}</p>
                            <p><strong>Category:</strong> {product.product_category}</p>
                            <p><strong>Quantity:</strong> {product.product_quantity}</p>
                            {product.product_image && (
                                <p>
                                    <strong>Image:</strong>
                                    <img
                                        src={product.product_image}
                                        alt={product.product_title}
                                        style={{ width: '100px', height: 'auto' }}
                                    />
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
