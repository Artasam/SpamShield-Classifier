import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ConfidenceMeter.css';

export default function ConfidenceMeter({ confidence, isSpam }) {
  const [fillVal, setFillVal] = useState(0);

  useEffect(() => {
    // Animate fill value slowly on mount
    const timer = setTimeout(() => setFillVal(confidence * 100), 300);
    return () => clearTimeout(timer);
  }, [confidence]);

  // Determine color based on verdict and confidence
  const getColorClass = () => {
    if (isSpam) {
      if (confidence > 0.8) return 'fill-danger';
      return 'fill-warning';
    } else {
      if (confidence > 0.8) return 'fill-success';
      return 'fill-primary';
    }
  };

  return (
    <div className="confidence-meter-wrapper">
      <div className="confidence-header">
        <span className="confidence-label">Confidence Score</span>
        <span className="confidence-value mono">{fillVal.toFixed(1)}%</span>
      </div>

      <div className="confidence-track">
        <motion.div
          className={`confidence-fill ${getColorClass()}`}
          initial={{ width: 0 }}
          animate={{ width: `${fillVal}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      <div className="confidence-markers">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
