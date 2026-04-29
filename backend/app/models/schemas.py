"""
Pydantic models for API request/response validation.
"""
from pydantic import BaseModel, Field
from typing import Literal


class PredictionRequest(BaseModel):
    """Request body for spam prediction."""
    message: str = Field(
        ...,
        min_length=1,
        max_length=5000,
        description="The email or SMS message to classify.",
        examples=["Congratulations! You've won a $1000 gift card. Click here to claim."]
    )


class PredictionResponse(BaseModel):
    """Response body for spam prediction."""
    prediction: Literal["spam", "ham"] = Field(
        description="Classification result: 'spam' or 'ham' (not spam)."
    )
    confidence: float = Field(
        ge=0.0, le=1.0,
        description="Model confidence score (0.0 to 1.0)."
    )
    is_spam: bool = Field(
        description="Boolean flag — True if classified as spam."
    )
    processed_text: str = Field(
        description="Preprocessed version of the input (after stemming, stopword removal)."
    )
    message: str = Field(
        description="Original input message."
    )


class HealthResponse(BaseModel):
    """Response body for health check."""
    status: str = "healthy"
    model_loaded: bool = False
    vectorizer_loaded: bool = False
    version: str = "1.0.0"


class ErrorResponse(BaseModel):
    """Standard error response."""
    detail: str
    status_code: int
