import React, { useEffect, useMemo, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Querycarousel.css';

import axios from 'axios';

function CartNotification({ showCartNotification, message }) {
  return (
    <div id='querycart-notification' style={{ display: showCartNotification ? 'block' : 'none' }}>
      {message}
    </div>
  );
}

function QueryCarousel({ query, user }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [cartNotificationMessage, setCartNotificationMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('https://row-buy.onrender.com/api/v1/products/all', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setProducts(productsResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `https://row-buy.onrender.com/api/v1/products/addtocart/${productId}/${user.id}`,
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
        setError(null);
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
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      {filteredProducts.length > 0 && (
        <div>
          <div className="queryall">
            <CartNotification showCartNotification={showCartNotification} message={cartNotificationMessage} />
            <div className="queryproduct-title">
              {filteredProducts.length > 0 && "Top Search Results"}
            </div>
            <Carousel responsive={responsive}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="query-card">
                  <span className="query-discount">- {product.percentageDiscount}%</span>
                  <img
                    className="query-product--image"
                    src={product.imageUrl}
                    alt="product image"
                  />
                  <h3 className="query-product-name">{product.productName}</h3>
                  <p className="price"> #{ product.sellingPrice}    <span className="original-prize"> #{ product.sellingPrice + product.amountDiscounted}</span></p>
                  <button
                    className="query-btn btn-primary btn-block"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
}

export default QueryCarousel;


