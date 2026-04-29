import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import ConfidenceMeter from './ConfidenceMeter';
import './ResultDisplay.css';

export default function ResultDisplay({ result, error, onReset }) {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          key="error"
          className="result-container error-result"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="result-icon error-icon">
            <AlertTriangle size={36} />
          </div>
          <h3 className="result-title">Analysis Failed</h3>
          <p className="result-message">{error}</p>
          <button className="btn btn-outline" onClick={onReset}>
            <RefreshCw size={16} /><span>Try Again</span>
          </button>
        </motion.div>
      )}

      {result && (
        <motion.div
          key="result"
          className={`result-container ${result.is_spam ? 'spam-result' : 'ham-result'}`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Icon */}
          <motion.div
            className={`result-icon ${result.is_spam ? 'spam-icon' : 'ham-icon'}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
          >
            {result.is_spam ? <AlertTriangle size={40} /> : <ShieldCheck size={40} />}
          </motion.div>

          {/* Verdict */}
          <motion.div
            className="result-verdict"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className={`verdict-badge ${result.is_spam ? 'spam-badge' : 'ham-badge'}`}>
              {result.is_spam ? '⚠ SPAM DETECTED' : '✓ NOT SPAM'}
            </span>
          </motion.div>

          {/* Confidence */}
          <ConfidenceMeter confidence={result.confidence} isSpam={result.is_spam} />

          {/* Details */}
          <motion.div
            className="result-details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="detail-row">
              <span className="detail-label">Classification</span>
              <span className={`detail-value ${result.is_spam ? 'spam-text' : 'ham-text'}`}>
                {result.prediction.toUpperCase()}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Confidence</span>
              <span className="detail-value mono">{(result.confidence * 100).toFixed(1)}%</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Processed Text</span>
              <span className="detail-value mono processed-text">{result.processed_text || '—'}</span>
            </div>
          </motion.div>

          {/* Reset */}
          <motion.button
            className="btn btn-outline reset-btn"
            onClick={onReset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw size={16} /><span>Analyze Another</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
