import React from "react";
import Navbar from "../Navbar";
import "./contactForm.css";

export default function Product() {
  return (
    <>
      <Navbar />

      <div className="content-wrapper">
        <div className="contact-address">
          <div className="address">
            <span>
              <label>
                <i className="fas fa-envelope"></i>
              </label>
              <p>arogya@gmail.com</p>
            </span>
            <span>
              <label>
                <i className="fas fa-phone-alt"></i>
              </label>
              <p>+94 71 742 734 4</p>
            </span>
            <span>
              <label>
                <i className="fas fa-map-marker-alt"></i>
              </label>
              <p>Malabe, Sri Lanka</p>
            </span>
          </div>
          <div className="social-media">
            <p>Follow Us on</p>
            <div>
              <span>
                <i className="fab fa-facebook-f"></i>
              </span>
              <span>
                <i className="fab fa-twitter"></i>
              </span>
              <span>
                <i className="fab fa-linkedin-in"></i>
              </span>
              <span>
                <i className="fab fa-instagram"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="contact-form-wrapper">
          <div className="contact-form">
            <h2>Get in Touch</h2>
            <div className="container">
              <div>
                <span>
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="First name" />
                </span>
                <span>
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Last name" />
                </span>
              </div>
              <div>
                <span>
                  <i className="fas fa-envelope"></i>
                  <input type="text" placeholder="Email" />
                </span>
              </div>
              <div>
                <textarea placeholder="Write Message To us..."></textarea>
              </div>
              <div>
                <button>Send Message</button>
              </div>
            </div>
          </div>
          <div className="contact-image">
            <img
              src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Contact"
            />
          </div>
        </div>
      </div>
    </>
  );
}
