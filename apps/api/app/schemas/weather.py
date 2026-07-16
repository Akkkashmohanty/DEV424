from pydantic import BaseModel


class WeatherResponse(BaseModel):
    city: str

    temperature: float

    feels_like: float

    humidity: int

    weather: str

    wind_speed: float

    pressure: int

    rainfall: float | None = None


    