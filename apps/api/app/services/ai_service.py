import json

from google import genai
from google.genai import types

from app.core.config import settings
from app.schemas.ai import (
    CropAdvice,
    FarmAdviceRequest,
    FarmAdviceResponse,
)


class AIService:
    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY,
        )

    def _build_prompt(
        self,
        request: FarmAdviceRequest,
    ) -> str:

        return f"""
You are an expert agricultural scientist.

Generate farming advice STRICTLY in JSON.

Crop:
{request.crop_name}

City:
{request.city}

Garden Type:
{request.garden_type}

Garden Size:
{request.garden_size}

Season:
{request.season}

Temperature:
{request.temperature}°C

Humidity:
{request.humidity}%

Sunlight:
{request.sunlight}

Water Availability:
{request.water_availability}

Return ONLY JSON.

Schema:

{{
  "summary":"",
  "why_this_crop":"",
  "watering_strategy":"",
  "fertilizer_plan":"",
  "disease_prevention":"",
  "harvesting_tips":"",
  "balcony_tips":"",
  "common_mistakes":[]
}}
"""

    def get_farm_advice(
        self,
        request: FarmAdviceRequest,
    ) -> FarmAdviceResponse:

        prompt = self._build_prompt(
            request,
        )

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
            ),
        )

        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        elif text.startswith("```"):
            text = text.replace("```", "")
            text = text.strip()

        try:

            result = json.loads(text)

        except Exception:

            result = {
                "summary": text,
                "why_this_crop": "",
                "watering_strategy": "",
                "fertilizer_plan": "",
                "disease_prevention": "",
                "harvesting_tips": "",
                "balcony_tips": "",
                "common_mistakes": [],
            }

        advice = CropAdvice(
            crop_name=request.crop_name,
            summary=result.get(
                "summary",
                "",
            ),
            why_this_crop=result.get(
                "why_this_crop",
                "",
            ),
            watering_strategy=result.get(
                "watering_strategy",
                "",
            ),
            fertilizer_plan=result.get(
                "fertilizer_plan",
                "",
            ),
            disease_prevention=result.get(
                "disease_prevention",
                "",
            ),
            harvesting_tips=result.get(
                "harvesting_tips",
                "",
            ),
            balcony_tips=result.get(
                "balcony_tips",
                "",
            ),
            common_mistakes=result.get(
                "common_mistakes",
                [],
            ),
        )

        return FarmAdviceResponse(
            advice=advice,
        )