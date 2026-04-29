import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import ShieldCanvas from './ShieldCanvas';
import './HeroSection.css';

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }),
};

export default function HeroSection({ onGetStarted }) {
  const scrollToPredict = () => {
    document.getElementById('predict-section')?.scrollIntoView({ behavior: 'smooth' });
    if (onGetStarted) onGetStarted();
  };

  return (
    <section className="hero-section" id="hero">
      {/* Background grid */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-inner">
        {/* Left — Text */}
        <div className="hero-text">
          <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible">
            <span className="hero-badge">
              <Sparkles size={14} />
              ML-Powered AI Detection
            </span>
          </motion.div>

          <motion.h1
            className="hero-headline"
            custom={1} variants={textVariants} initial="hidden" animate="visible"
          >
            Stop Spam
            <br />
            <span className="gradient-text">Before It Starts</span>
          </motion.h1>

          <motion.p
            className="hero-desc"
            custom={2} variants={textVariants} initial="hidden" animate="visible"
          >
            SpamShield AI uses advanced machine learning to classify emails and SMS messages
            with <strong>instant confidence scoring</strong>. Trained on 5,500+ real messages.
          </motion.p>

          <motion.div
            className="hero-stats"
            custom={3} variants={textVariants} initial="hidden" animate="visible"
          >
            {[
              { value: '5,572', label: 'Training Samples' },
              { value: '97%+', label: 'Accuracy' },
              { value: '<50ms', label: 'Response Time' },
            ].map((s) => (
              <div className="hero-stat" key={s.label}>
                <span className="stat-value gradient-text">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="hero-cta"
            custom={4} variants={textVariants} initial="hidden" animate="visible"
          >
            <button className="btn btn-lg" onClick={scrollToPredict}>
              <span>Try SpamShield AI</span>
            </button>
            <a href="#features" className="btn btn-outline btn-lg">
              <span>Learn More</span>
            </a>
          </motion.div>
        </div>

        {/* Right — 3D Canvas */}
        <motion.div
          className="hero-canvas-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero-canvas-glow" aria-hidden="true" />
          <ShieldCanvas />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToPredict}
        role="button"
        tabIndex={0}
        aria-label="Scroll to try"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
