from pydantic import BaseModel


class WeatherResponse(BaseModel):
    city: str

    temperature: float

    humidity: int

    weather: str

    season: str

    rainfall: float