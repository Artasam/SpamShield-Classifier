import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, ChevronDown, ChevronUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import './HistoryPanel.css';

export default function HistoryPanel({ history, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!history || history.length === 0) return null;

  return (
    <div className="history-panel-wrapper">
      <button 
        className="history-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <History size={16} />
        <span>Recent Analyses ({history.length})</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="history-content glass-card-component"
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="history-header">
              <span className="history-title">Local History</span>
              <button className="clear-history-btn" onClick={onClear}>
                <Trash2 size={14} /> Clear
              </button>
            </div>

            <div className="history-list">
              {history.map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HistoryItem({ item }) {
  const date = new Date(item.timestamp).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className={`history-item ${item.is_spam ? 'is-spam' : 'is-ham'}`}>
      <div className="hi-icon">
        {item.is_spam ? <AlertTriangle size={16} /> : <ShieldCheck size={16} />}
      </div>
      <div className="hi-content">
        <div className="hi-msg">"{item.message.substring(0, 60)}{item.message.length > 60 ? '...' : ''}"</div>
        <div className="hi-meta">
          <span className="hi-verdict">{item.prediction.toUpperCase()}</span>
          <span className="hi-dot">•</span>
          <span className="hi-conf">{(item.confidence * 100).toFixed(0)}%</span>
          <span className="hi-dot">•</span>
          <span className="hi-date">{date}</span>
        </div>
      </div>
    </div>
  );
}
