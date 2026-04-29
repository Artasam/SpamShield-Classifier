import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Shuffle, X, AlertTriangle } from 'lucide-react';
import { SAMPLE_MESSAGES } from '../../utils/constants';
import './PredictCard.css';

const MAX_CHARS = 5000;

export default function PredictCard({ onPredict, loading }) {
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setMessage(val);
      setCharCount(val.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onPredict(message.trim());
    }
  };

  const loadSample = (type) => {
    const samples = SAMPLE_MESSAGES[type];
    const sample = samples[Math.floor(Math.random() * samples.length)];
    setMessage(sample);
    setCharCount(sample.length);
  };

  const clearMessage = () => {
    setMessage('');
    setCharCount(0);
  };

  const charPercent = (charCount / MAX_CHARS) * 100;
  const isNearLimit = charPercent > 80;

  return (
    <div className="predict-card glass-card-component" id="predict-section">
      <div className="predict-card-header">
        <h2 className="predict-card-title">Analyze Your Message</h2>
        <p className="predict-card-subtitle">Paste any email or SMS message below to check if it's spam.</p>
      </div>

      <form onSubmit={handleSubmit} className="predict-form">
        {/* Textarea */}
        <div className="textarea-wrapper">
          <textarea
            id="message-input"
            className="input-field predict-textarea"
            placeholder="Paste your email or SMS message here... (e.g. 'You have won a prize! Click here to claim.')"
            value={message}
            onChange={handleChange}
            rows={6}
            disabled={loading}
            aria-label="Message to classify"
          />
          <AnimatePresence>
            {message && (
              <motion.button
                type="button"
                className="clear-btn"
                onClick={clearMessage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Clear message"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div className="predict-bottom-bar">
          {/* Char counter */}
          <div className="char-counter">
            <div className="char-bar">
              <motion.div
                className={`char-fill ${isNearLimit ? 'near-limit' : ''}`}
                animate={{ width: `${charPercent}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className={`char-count ${isNearLimit ? 'near-limit-text' : ''}`}>
              {charCount}/{MAX_CHARS}
            </span>
          </div>

          {/* Sample buttons */}
          <div className="sample-btns">
            <span className="sample-label">Try sample:</span>
            <button type="button" className="sample-btn spam" onClick={() => loadSample('spam')}>
              <AlertTriangle size={13} /> Spam
            </button>
            <button type="button" className="sample-btn ham" onClick={() => loadSample('ham')}>
              <Shuffle size={13} /> Ham
            </button>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="btn btn-lg predict-submit"
          disabled={!message.trim() || loading}
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
        >
          {loading ? (
            <span className="loading-dots">
              <span>Analyzing</span>
              <span className="dot-1">.</span>
              <span className="dot-2">.</span>
              <span className="dot-3">.</span>
            </span>
          ) : (
            <>
              <Send size={18} />
              <span>Analyze Message</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
