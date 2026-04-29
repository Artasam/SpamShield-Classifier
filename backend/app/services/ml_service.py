"""
ML Model Service — Singleton pattern for model lifecycle management.

Loads the trained sklearn model and TF-IDF vectorizer once on startup,
provides thread-safe inference with confidence scoring.
"""
import pickle
import logging
from pathlib import Path
from typing import Optional, Tuple

from app.config import MODEL_PATH, VECTORIZER_PATH
from app.services.text_processor import transform_text

logger = logging.getLogger(__name__)


class MLService:
    """Manages ML model loading and inference."""
    
    _instance: Optional["MLService"] = None
    
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self._is_loaded = False
    
    @classmethod
    def get_instance(cls) -> "MLService":
        """Get or create the singleton instance."""
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
    
    def load_models(self) -> None:
        """
        Load model and vectorizer from pickle files.
        Called once during application startup.
        """
        try:
            logger.info(f"Loading model from {MODEL_PATH}")
            with open(MODEL_PATH, "rb") as f:
                self.model = pickle.load(f)
            
            logger.info(f"Loading vectorizer from {VECTORIZER_PATH}")
            with open(VECTORIZER_PATH, "rb") as f:
                self.vectorizer = pickle.load(f)
            
            self._is_loaded = True
            logger.info("✅ Models loaded successfully")
            
        except FileNotFoundError as e:
            logger.error(f"Model file not found: {e}")
            raise RuntimeError(f"Model file not found: {e}")
        except Exception as e:
            logger.error(f"Failed to load models: {e}")
            raise RuntimeError(f"Failed to load models: {e}")
    
    @property
    def is_loaded(self) -> bool:
        """Check if models are loaded and ready."""
        return self._is_loaded
    
    def predict(self, message: str) -> dict:
        """
        Run spam prediction on a message.
        
        Args:
            message: Raw input text.
            
        Returns:
            Dictionary with prediction, confidence, processed_text, and is_spam.
            
        Raises:
            RuntimeError: If models are not loaded.
        """
        if not self._is_loaded:
            raise RuntimeError("Models not loaded. Call load_models() first.")
        
        # Step 1: Preprocess
        processed_text = transform_text(message)
        
        # Step 2: Vectorize
        vector = self.vectorizer.transform([processed_text])
        
        # Step 3: Predict
        prediction_int = self.model.predict(vector.toarray())[0]
        
        # Step 4: Get confidence via predict_proba if available
        confidence = 0.0
        if hasattr(self.model, "predict_proba"):
            proba = self.model.predict_proba(vector.toarray())[0]
            confidence = float(max(proba))
        else:
            # Fallback — binary confidence
            confidence = 1.0
        
        is_spam = bool(prediction_int == 1)
        
        return {
            "prediction": "spam" if is_spam else "ham",
            "confidence": round(confidence, 4),
            "is_spam": is_spam,
            "processed_text": processed_text,
            "message": message,
        }


# Module-level convenience function
def get_ml_service() -> MLService:
    """Get the ML service singleton."""
    return MLService.get_instance()
