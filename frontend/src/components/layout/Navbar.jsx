import { Shield, Star } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <a href="#hero" className="navbar-logo" onClick={scrollToTop}>
          <div className="logo-icon">
            <Shield size={20} />
          </div>
          <span className="logo-text">SpamShield<span className="text-primary">.ai</span></span>
        </a>

        <div className="navbar-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            aria-label="View on GitHub"
          >
            <Star size={20} />
            <span className="github-text">Star on GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
