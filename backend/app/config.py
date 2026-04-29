"""
Application configuration and settings.
"""
import os
from pathlib import Path

# Base paths
BASE_DIR = Path(__file__).resolve().parent.parent
ML_ARTIFACTS_DIR = BASE_DIR / "ml_artifacts"

# Model file paths
MODEL_PATH = ML_ARTIFACTS_DIR / "model.pkl"
VECTORIZER_PATH = ML_ARTIFACTS_DIR / "Vectorizer.pkl"

# API settings
API_VERSION = "1.0.0"
API_TITLE = "SpamShield AI API"
API_DESCRIPTION = """
🛡️ SpamShield AI — Intelligent Email & SMS Spam Detection API.

Powered by machine learning, this API analyzes messages and classifies them
as **spam** or **ham** (not spam) with confidence scores.

## Features
- Real-time spam classification
- Confidence scoring
- Text preprocessing pipeline (tokenization, stemming, stopword removal)
"""

# CORS settings
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

# Rate limiting
RATE_LIMIT = os.getenv("RATE_LIMIT", "30/minute")
