from fastapi import APIRouter

from app.services.weather_service import WeatherService

router = APIRouter(
    prefix="/weather",
    tags=["Weather"],
)


@router.get("/{city}")
async def get_weather(
    city: str,
):

    service = WeatherService()

    return await service.get_weather(
        city,
    )