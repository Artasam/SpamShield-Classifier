import { useState, useCallback } from 'react';
import { predictMessage } from '../services/api';

/**
 * Prediction hook — manages API call state for spam classification.
 */
export function usePredict() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = useCallback(async (message) => {
    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictMessage(message);
      setResult(data);
      return data;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Prediction failed. Please try again.';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, predict, reset };
}
