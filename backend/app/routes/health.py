"""
Health check route — GET /api/health
"""
from fastapi import APIRouter
from app.models.schemas import HealthResponse
from app.services.ml_service import get_ml_service
from app.config import API_VERSION

router = APIRouter(prefix="/api", tags=["Health"])


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check",
    description="Returns the health status of the API and whether ML models are loaded.",
)
async def health_check():
    """Check API health and model readiness."""
    ml_service = get_ml_service()
    
    return HealthResponse(
        status="healthy",
        model_loaded=ml_service.is_loaded and ml_service.model is not None,
        vectorizer_loaded=ml_service.is_loaded and ml_service.vectorizer is not None,
        version=API_VERSION,
    )
