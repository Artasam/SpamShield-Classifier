import { motion } from 'framer-motion';
import './GlassCard.css';

/**
 * Reusable glassmorphism card component with hover animation.
 */
export default function GlassCard({ children, className = '', hover = true, glow = '', ...props }) {
  return (
    <motion.div
      className={`glass-card-component ${glow ? `glow-${glow}` : ''} ${hover ? 'hoverable' : ''} ${className}`}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
