import { Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer section">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo-text">SpamShield<span className="text-primary">.ai</span></span>
        </div>
        
        <p className="footer-copyright">
          © {year} SpamShield AI. All rights reserved.
        </p>
        
        <p className="footer-made-with">
          Built with <Heart size={14} className="heart-icon" /> using React, FastAPI, & scikit-learn
        </p>
      </div>
    </footer>
  );
}
