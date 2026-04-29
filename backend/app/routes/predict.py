"""
Prediction route — POST /api/predict
"""
from fastapi import APIRouter, HTTPException
from app.models.schemas import PredictionRequest, PredictionResponse, ErrorResponse
from app.services.ml_service import get_ml_service

router = APIRouter(prefix="/api", tags=["Prediction"])


@router.post(
    "/predict",
    response_model=PredictionResponse,
    responses={
        503: {"model": ErrorResponse, "description": "Model not loaded"},
        422: {"model": ErrorResponse, "description": "Validation error"},
    },
    summary="Classify a message as spam or ham",
    description="Submit an email or SMS message for real-time spam classification with confidence scoring.",
)
async def predict(request: PredictionRequest):
    """
    Analyze a message and return spam/ham classification.
    
    - Preprocesses input (tokenization, stemming, stopword removal)
    - Vectorizes with trained TF-IDF
    - Classifies with trained ML model
    - Returns prediction with confidence score
    """
    ml_service = get_ml_service()
    
    if not ml_service.is_loaded:
        raise HTTPException(
            status_code=503,
            detail="ML models are not loaded. Please try again later."
        )
    
    try:
        result = ml_service.predict(request.message)
        return PredictionResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )
