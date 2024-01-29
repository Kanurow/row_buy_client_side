import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsRocketTakeoff } from 'react-icons/bs';
import Footer from '../layout/Footer';
import "./ShoppingCart.css";

function ShoppingCart({ user }) {
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user && user.id) {
          const cartData = await fetchUserShoppingCart(user.id);
          setCart(cartData);
          localStorage.setItem('userCart', JSON.stringify(cartData));
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [user, forceUpdate]);

  const fetchUserShoppingCart = async (userId) => {
    try {
      const response = await axios.get(`https://jumia-clone-rowland.onrender.com/api/products/cart/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });

      return response.data.map((cart) => ({
        ...cart,
        quantity: 1,
      }));
    } catch (error) {
      setError(error.message);
      return [];
    }
  };

  const removeItem = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      await axios.delete(`https://jumia-clone-rowland.onrender.com/api/products/removefromcart/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          windows: 'true',
        },
      });

      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      localStorage.setItem('userCart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const addItem = async (productId) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.post(`https://jumia-clone-rowland.onrender.com/api/products/addtocart/${productId}`, {
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          windows: 'true',
        },
      });

      const updatedCartData = response.data.map((cart) => ({
        ...cart,
        quantity: 1,
      }));

      setCart(updatedCartData);
      localStorage.setItem('userCart', JSON.stringify(updatedCartData));
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    const maxQuantity = cart[index].product.quantity;

    if (newQuantity < 0) {
      return;
    }

    if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }

    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = newQuantity;
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.sellingPrice * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  return (
    <>
      <div className='cont'>
        <div className='container1'>
          <div className="shopping-cart container">
            <h5 className='cart-length'>Cart (<span>{cart.length}</span>)</h5>
            <hr />

            {cart.map((item, index) => (
              <div key={item.id} className='product-details'>
                <div className='product-img-setion'>
                  <img className='product-img'
                    src={item.product.imageUrl}
                    alt='product-px'></img>
                  <button className='remove-btn'
                    onClick={() => removeItem(item.id)}
                  >
                    <AiOutlineDelete className='del-icon' size={15} />
                    REMOVE
                  </button>
                </div>

                <div className='product-info'>
                  <div className='prod-name'>{item.product.productName} </div>
                  <div className='prod-qty'>{item.product.quantity} units</div>
                  <div className='row-buy-express'><span className='row-buy'>JUMIA</span> <BsRocketTakeoff size={12} /> <span className='express'>EXPRESS</span></div>
                </div>

                <div>
                  <p className='original-price'>{item.product.sellingPrice}</p>
                  <div className='prev-price'> <span className='prev-price-sum'>{item.product.sellingPrice + item.product.amountDiscounted}</span> <span className='prev-price-discount'>-{item.product.percentageDiscount}%</span></div>
                  <input
                    type="number"
                    className="quantity-input"
                    min="1"
                    max={item.product.quantity}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                  />
                </div>
                <hr className='hr' />
              </div>
            ))}
          </div>
        </div>

        <div className='container2'>
          <div className='cart-summary container'>
            <div className='cart-summary-title'>Cart Summary</div> <hr></hr>
            <div className='cart-summary-subtotal'>Subtotal <span className='amount'># {calculateTotal()} </span></div>
            <div className='cart-summary-note'>Delivery fees not included yet</div>
            <button className='checkout-btn' onClick={handleCheckout}>Checkout  <span className='amount'> # {calculateTotal()}</span></button>
          </div>
          <div className='container below-cart-summary'>
            <div className='header-text'>Returns Are Easy</div>
            <div className='note'>Free returns within 15 days for Official Store items and 7 days for other eligible items.</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ShoppingCart;
