import React from 'react';
import './About.css';
import Footer from '../layout/Footer';

const About = () => {
  return (
    <div>
    <div className="about-container">
    <div class="container">
    <h1>Welcome to the Row-Buy Application</h1>
    
    <p>Where innovation converges with convenience, offering more than just an e-commerce platform – it's a tailored shopping experience crafted with your needs in mind. Our web application, developed from the ground up, redefines online shopping by seamlessly combining cutting-edge technology with a user-friendly design.</p>

    <h2>Our Tech Foundation:</h2>
    <p>Row-Buy boasts a robust technology stack to power our platform. Leveraging React for the front end ensures a smooth, responsive, and interactive user interface. Meanwhile, our backend, constructed with Spring Boot, provides a reliable and secure foundation for all operations. With MySQL as our database management system, your data is stored securely and efficiently, allowing quick access to your information.</p>

    <h2>User and Guest Engagement:</h2>
    <p>Guests can explore all products and view details but can't add items to their cart or proceed to checkout. Only logged-in users can access additional functionalities such as adding products to the cart and checking out. Exclusive product creation rights are reserved for admins.</p>

    <h2>Innovative User Registration:</h2>
    <p>Experience a unique and secure user role management system. To gain admin privileges, simply append the string "row" to your email during registration, granting you enhanced control over your shopping experience and access to special features.</p>

    <h2>Enhanced Security using JWT Tokens:</h2>
    <p>Your security is paramount. The Row-Buy application prioritizes the protection of your personal and financial information through the use of JSON Web Tokens (JWT). Rest assured that your passwords are securely encrypted, allowing you to shop worry-free.</p>

    <h2>Seamless Payment with Paystack API:</h2>
    <p>Row-Buy integrates the Paystack API, a leading Nigerian payment gateway, to facilitate secure and hassle-free transactions. Be it electronics, fashion, or household essentials, our payment system ensures swift and reliable transactions for an effortless shopping experience.</p>

    <h2>Shop from Your Preferred Vendors:</h2>
    <p>Row-Buy goes beyond traditional e-commerce by introducing a feature that allows you to directly shop from your favorite vendors. Discover unique products, support local businesses, and enjoy a personalized shopping journey tailored to your preferences.</p>

    <p>At Row-Buy, we're not just revolutionizing online shopping; we're enhancing it. Experience the future of e-commerce today – start exploring, start shopping, and let us redefine the way you shop online. Thank you for choosing Row-Buy as your preferred online shopping destination.</p>

    <p>Happy Shopping!</p>

    <p><em>Team Rowland</em></p>
</div>
    </div>

    <Footer />

    </div>
  );
}

export default About;
