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
You are FarmGym AI, an expert urban farming consultant for Indian home gardeners.

Your job is to generate accurate, practical and personalized farming advice.

User Information

City: {request.city}

Garden Type: {request.garden_type}

Garden Size: {request.garden_size}

Primary Crop: {request.crop_name}

Season: {request.season}

Temperature: {request.temperature}°C

Humidity: {request.humidity}%

Sunlight: {request.sunlight}

Water Availability: {request.water_availability}

Budget: {request.budget}

Experience Level: {request.experience_level}

Goals: {", ".join(request.goals)}

Preferred Crops: {", ".join(request.preferred_crops)}

Avoid Crops: {", ".join(request.avoid_crops)}

Organic Only: {request.organic_only}

Rules

- Recommend crops suitable for India.
- Consider climate and season.
- Prefer balcony/container gardening when applicable.
- Recommendations must be practical.
- Never use markdown.
- Never use code fences.
- Return ONLY valid JSON.
- Do not add explanations outside JSON.
- Every field must exist.
- If unknown, use an empty string or empty array.

Return this exact JSON schema:

{{
  "summary":"",
  "why_this_crop":"",
  "recommended_crops":[],
  "companion_plants":[],
  "watering_strategy":"",
  "watering_schedule":[],
  "fertilizer_plan":"",
  "fertilizer_schedule":[],
  "disease_prevention":"",
  "harvesting_tips":"",
  "harvest_timeline":"",
  "estimated_yield":"",
  "seasonal_warnings":[],
  "sustainability_tips":[],
  "next_actions":[],
  "balcony_tips":"",
  "common_mistakes":[]
}}
"""

    def _extract_json(self, text: str) -> dict:
        text = text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "", 1)

        if text.startswith("```"):
            text = text.replace("```", "", 1)

        if text.endswith("```"):
            text = text[:-3]

        text = text.strip()

        try:
            return json.loads(text)
        except Exception:
            return {}

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

        result = self._extract_json(response.text)

        if not result:
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.2,
                ),
            )
            result = self._extract_json(response.text)

        if not result:
            result = {
                "summary": "AI could not generate a structured response.",
                "why_this_crop": "",
                "recommended_crops": [],
                "companion_plants": [],
                "watering_strategy": "",
                "watering_schedule": [],
                "fertilizer_plan": "",
                "fertilizer_schedule": [],
                "disease_prevention": "",
                "harvesting_tips": "",
                "harvest_timeline": "",
                "estimated_yield": "",
                "seasonal_warnings": [],
                "sustainability_tips": [],
                "next_actions": [],
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
            recommended_crops=result.get("recommended_crops", []),
            companion_plants=result.get("companion_plants", []),
            watering_strategy=result.get(
                "watering_strategy",
                "",
            ),
            watering_schedule=result.get("watering_schedule", []),
            fertilizer_plan=result.get(
                "fertilizer_plan",
                "",
            ),
            fertilizer_schedule=result.get("fertilizer_schedule", []),
            disease_prevention=result.get(
                "disease_prevention",
                "",
            ),
            harvesting_tips=result.get(
                "harvesting_tips",
                "",
            ),
            harvest_timeline=result.get("harvest_timeline", ""),
            estimated_yield=result.get("estimated_yield", ""),
            seasonal_warnings=result.get("seasonal_warnings", []),
            sustainability_tips=result.get("sustainability_tips", []),
            next_actions=result.get("next_actions", []),
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