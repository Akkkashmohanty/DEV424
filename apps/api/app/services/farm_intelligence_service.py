from app.repositories.farm_intelligence_repository import (
    FarmIntelligenceRepository,
)

from app.schemas.farm_intelligence import (
    FarmRecommendationRequest,
)


class FarmIntelligenceService:

    def __init__(
        self,
        repository: FarmIntelligenceRepository,
    ):
        self.repository = repository

    def recommend_crops(
        self,
        request: FarmRecommendationRequest,
    ):
        crops = self.repository.get_all_crops()

        if not crops:
            return {
                "recommendations": [],
            }

        recommendations = []

        for crop in crops:

            score = 0
            reasons = []

            # Temperature (30)

            if (
                crop.ideal_temperature_min
                <= request.temperature
                <= crop.ideal_temperature_max
            ):
                score += 30
                reasons.append("Ideal temperature match")

            # Humidity (10)

            if (
                crop.humidity_min
                <= request.humidity
                <= crop.humidity_max
            ):
                score += 10
                reasons.append("Humidity suitable")

            # Sunlight (20)

            if (
                crop.sunlight_requirement.lower()
                == request.sunlight.lower()
            ):
                score += 20
                reasons.append("Sunlight requirement matched")

            # Water (15)

            if (
                crop.water_requirement.lower()
                == request.water_availability.lower()
            ):
                score += 15
                reasons.append("Water availability suitable")

            # Season (25)

            seasons = [
                season.season.lower()
                for season in crop.seasons
            ]

            if request.season.lower() in seasons:
                score += 25
                reasons.append("Season matched")

            recommendations.append(
                {
                    "id": crop.id,
                    "name": crop.name,
                    "category": crop.category,
                    "score": score,
                    "reason": ", ".join(reasons),
                }
            )

        recommendations.sort(
            key=lambda crop: crop["score"],
            reverse=True,
        )

        return {
            "recommendations": recommendations[:5],
        }