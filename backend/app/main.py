"""
SpamShield AI — FastAPI Application Entry Point

Production-grade spam classification API with ML model integration.
"""
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import API_TITLE, API_DESCRIPTION, API_VERSION, ALLOWED_ORIGINS
from app.services.ml_service import get_ml_service
from app.routes import predict, health

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Loads ML models on startup, cleans up on shutdown.
    """
    logger.info("🚀 Starting SpamShield AI API...")
    
    # Load models on startup
    ml_service = get_ml_service()
    ml_service.load_models()
    logger.info("✅ All systems ready")
    
    yield  # Application runs here
    
    # Cleanup on shutdown
    logger.info("👋 Shutting down SpamShield AI API...")


# Create FastAPI application
app = FastAPI(
    title=API_TITLE,
    description=API_DESCRIPTION,
    version=API_VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(predict.router)
app.include_router(health.router)


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint — API info."""
    return {
        "name": API_TITLE,
        "version": API_VERSION,
        "docs": "/docs",
        "health": "/api/health",
    }
