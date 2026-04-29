import { motion } from 'framer-motion';
import { Zap, Brain, Shield, Lock, BarChart3, History } from 'lucide-react';
import { FEATURES } from '../../utils/constants';
import './FeatureGrid.css';

const IconMap = { Zap, Brain, Shield, Lock, BarChart3, History };

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function FeatureGrid() {
  return (
    <section className="section features-section" id="features">
      <h2 className="section-title">Why SpamShield AI?</h2>
      <p className="section-subtitle">
        Built for speed, accuracy, and privacy. Experience the next generation of spam detection.
      </p>

      <motion.div 
        className="feature-grid"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {FEATURES.map((feature, idx) => {
          const IconComponent = IconMap[feature.icon];
          return (
            <motion.div key={idx} variants={itemVariant} className="feature-card glass">
              <div className="feature-icon-wrapper">
                <IconComponent size={24} className="feature-icon" />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
