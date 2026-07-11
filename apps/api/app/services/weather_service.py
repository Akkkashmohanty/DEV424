from urllib.parse import quote

import httpx

from app.core.config import settings


class WeatherService:

    GEO_URL = "https://api.openweathermap.org/geo/1.0/direct"

    WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

    def __init__(self):

        self.api_key = settings.OPENWEATHER_API_KEY

    async def get_weather(
        self,
        city: str,
    ) -> dict:

        async with httpx.AsyncClient(
            timeout=10.0,
        ) as client:

            # -----------------------------
            # Step 1
            # Get coordinates
            # -----------------------------

            geo_response = await client.get(
                self.GEO_URL,
                params={
                    "q": quote(city),
                    "limit": 1,
                    "appid": self.api_key,
                },
            )

            geo_response.raise_for_status()

            geo = geo_response.json()

            if not geo:

                raise Exception(
                    f"City '{city}' not found."
                )

            lat = geo[0]["lat"]

            lon = geo[0]["lon"]

            # -----------------------------
            # Step 2
            # Weather
            # -----------------------------

            weather_response = await client.get(
                self.WEATHER_URL,
                params={
                    "lat": lat,
                    "lon": lon,
                    "appid": self.api_key,
                    "units": "metric",
                },
            )

            weather_response.raise_for_status()

            weather = weather_response.json()

            return {

                "city": city,

                "temperature": weather["main"]["temp"],

                "humidity": weather["main"]["humidity"],

                "weather": weather["weather"][0]["main"],

                "rainfall": weather.get(
                    "rain",
                    {},
                ).get(
                    "1h",
                    0,
                ),
            }