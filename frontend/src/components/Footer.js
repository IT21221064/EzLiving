import React from "react";
import './footer.css'

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>Welcome to EzLiving, your trusted source for home appliances designed with accessibility and convenience in mind. We are committed to making daily life easier for everyone, especially those with visual impairments.
</p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <address>
            Email: <a href="mailto:contact@example.com">contact@EzLiving.com</a>
          </address>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/items">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/services">Feedbacks</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 EzLiving. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
