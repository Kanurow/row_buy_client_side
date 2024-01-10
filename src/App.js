import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateProductForm from './form/CreateProductForm';
import Register from './form/Register';
import Signin from './form/SignIn';
import PhonesAndTablets from './categories/PhonesAndTablets';
import Supermarket from './categories/Supermarket'
import BabyProducts from './categories/BabyProducts';
import Computing from './categories/Computing';
import Electronics from './categories/Electronics'
import Books from './categories/Books'
import OtherProducts from './categories/OtherProducts';
import Travels from './categories/Travels';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Appliances from './categories/Appliances';
import ViewProduct from './pages/ViewProduct';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductsCarousel from './pages/ProductsCarousel';
import VendorsProducts from './pages/VendorsProducts';
import VendorsList from './pages/VendorsList';
import EditUser from './pages/EditUser';
import VendorsOrders from './pages/VendorsOrders';
import Logout from './form/Logout';
import About from './pages/About';

function App() {

  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          'https://jumia-clone-rowland.onrender.com/api/users/user/me',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          }
        );
        setUser(userResponse.data);

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
        setAllProducts(productsResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className="App">
      <Router>
        
        <Navbar user={user} />
        
        <Routes>
          <Route exact path="/" element={<Home user={user} />} />
          <Route  element={<ProductsCarousel user={user} />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Signin />} />
          <Route exact path="/loggedOut" element={<Logout />} />
          <Route exact path="/createProduct" element={<CreateProductForm user={user} />} />

          <Route exact path='/phonesAndTablets' element={<PhonesAndTablets user={user} />}></Route>
          <Route exact path="/computing" element={<Computing user={user} />} />
          <Route exact path="/babyProducts" element={<BabyProducts user={user} />} />
          <Route exact path="/supermarket" element={<Supermarket user={user} />} />
          <Route exact path="/electronics" element={<Electronics user={user} />} />
          <Route exact path="/travels" element={<Travels user={user} />} />
          <Route exact path="/books" element={<Books user={user} />} />
          <Route exact path="/appliances" element={<Appliances user={user} />} />
          <Route exact path="/others" element={<OtherProducts user={user} />} />
          <Route exact path="/viewProduct/:id" element={<ViewProduct user={user}/>} />

          <Route exact path="/cart" element={<ShoppingCart user={user} />} />
          <Route exact path="/checkout" element={<Checkout user={user} />} />
          <Route exact path="/orderHistory" element={<OrderHistory user={user} />} />
          <Route exact path="/vendorsOrders" element={<VendorsOrders user={user} />} />
          <Route exact path='/allVendors' element={<VendorsList  />} />
          <Route exact path='/viewVendor/:id' element={<VendorsProducts user={user} />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path='/about' element={<About />} />


        </Routes>
      </Router>

    </div>
  );
}

export default App;
