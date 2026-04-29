import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'spamshield-history';
const MAX_HISTORY = 50;

/**
 * History hook — manages prediction history in localStorage.
 */
export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addEntry = useCallback((entry) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    setHistory(prev => [newEntry, ...prev].slice(0, MAX_HISTORY));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const removeEntry = useCallback((id) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  }, []);

  return { history, addEntry, clearHistory, removeEntry };
}
