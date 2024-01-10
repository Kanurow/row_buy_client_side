import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ProductCarousel.css';

import axios from 'axios';
import { Link } from 'react-router-dom';



function CartNotification({ showCartNotification, message }) {
  return (
    <div id='querycart-notification' style={{ display: showCartNotification ? 'block' : 'none' }}>
      {message}
    </div>
  );
}

function ProductsCarousel({ user }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [cartNotificationMessage, setCartNotificationMessage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          'https://jumia-clone-rowland.onrender.com/api/products/all',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          }
        );
        setProducts(productsResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);


  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `https://jumia-clone-rowland.onrender.com/api/products/addtocart/${productId}/${user.id}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        }
      );

      setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, ...response.data }; 
        }
        return product;
      })
    );

    setShowCartNotification(true);
    setCartNotificationMessage('Product Added To Cart');
    setTimeout(() => {
      setShowCartNotification(false);
      setCartNotificationMessage('');
    }, 5000);
  } catch (error) {
    setShowCartNotification(true);
    setCartNotificationMessage(error.message); 
    setTimeout(() => {
      setShowCartNotification(false);
    }, 5000);
  }
};




    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };



  return (
    <>
    <div className='all'>
    <CartNotification showCartNotification={showCartNotification} message={cartNotificationMessage} />

      <div className='product-title'>
      
        
        {user === undefined && "Log in to add products to your shopping cart. To create an admin level account type add 'row' to your registeration email "}
        {products.length > 0 && "Top Selling Items"}
      </div>
      <Carousel responsive={responsive}>
      {products.map((product) => (
    <div key={product.id} className="card">
      <span className='discount'>- {product.percentageDiscount}%</span>
      <div>
          <Link to={`/viewProduct/${product.id}`}>
            <img
              className="product--image"
              src={product.imageUrl}
              alt="product image"
            />
          </Link>
      </div>
      <h3 className='product-name'>{product.productName}</h3>
      <p className="price"> #{ product.sellingPrice}    <span className="original-prize"> #{ product.sellingPrice + product.amountDiscounted}</span></p>
              <button
                className='btn mx-2'
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
              </button>
    </div>
  ))}
  
</Carousel>

    </div>

    </>
    
  )
}

export default ProductsCarousel