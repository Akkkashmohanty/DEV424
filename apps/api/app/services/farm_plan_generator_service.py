from datetime import date, timedelta

from app.schemas.farm_plan_generator import (
    CropTaskResponse,
    FarmPlanGeneratorRequest,
    ProgressResponse,
    TimelineResponse,
    WateringScheduleResponse,
)

from app.services.farm_intelligence_service import (
    FarmIntelligenceService,
)

from app.schemas.farm_intelligence import (
    FarmRecommendationRequest,
)


class FarmPlanGeneratorService:

    def __init__(
        self,
        intelligence_service: FarmIntelligenceService,
    ):
        self.intelligence_service = intelligence_service

    # --------------------------------------------------------
    # Watering Schedule
    # --------------------------------------------------------

    def _generate_watering_schedule(
        self,
        frequency: str,
    ) -> list[WateringScheduleResponse]:

        frequency = frequency.lower()

        if frequency == "low":

            return [
                WateringScheduleResponse(
                    day="Tuesday",
                    time="07:00 AM",
                ),
                WateringScheduleResponse(
                    day="Saturday",
                    time="07:00 AM",
                ),
            ]

        elif frequency == "medium":

            return [
                WateringScheduleResponse(
                    day="Monday",
                    time="07:00 AM",
                ),
                WateringScheduleResponse(
                    day="Wednesday",
                    time="07:00 AM",
                ),
                WateringScheduleResponse(
                    day="Friday",
                    time="07:00 AM",
                ),
            ]

        return [
            WateringScheduleResponse(
                day="Monday",
                time="07:00 AM",
            ),
            WateringScheduleResponse(
                day="Tuesday",
                time="07:00 AM",
            ),
            WateringScheduleResponse(
                day="Thursday",
                time="07:00 AM",
            ),
            WateringScheduleResponse(
                day="Saturday",
                time="07:00 AM",
            ),
        ]

    # --------------------------------------------------------
    # Timeline
    # --------------------------------------------------------

    def _generate_timeline(
        self,
        crop,
    ) -> list[TimelineResponse]:

        timeline = []

        has_harvest = False

        for task in crop.tasks:

            timeline.append(
                TimelineResponse(
                    day=task.day_number,
                    title=task.title,
                    description=task.description or "",
                )
            )

            if task.title.lower() == "harvest":
                has_harvest = True

        if not has_harvest:

            timeline.append(
                TimelineResponse(
                    day=crop.harvest_days,
                    title="Harvest",
                    description="Crop is ready for harvest.",
                )
            )

        timeline.sort(
            key=lambda x: x.day,
        )

        return timeline

    # --------------------------------------------------------
    # Sustainability
    # --------------------------------------------------------

    def _generate_sustainability_tips(
        self,
        crop,
    ) -> list[str]:

        tips = [
            "Use compost instead of chemical fertilizers.",
            "Collect rainwater whenever possible.",
            "Apply mulch to reduce evaporation.",
        ]

        if crop.water_requirement.lower() == "high":

            tips.append(
                "Use drip irrigation to save water."
            )

        return tips

    # --------------------------------------------------------
    # Planner
    # --------------------------------------------------------

    def generate_plan(
        self,
        request: FarmPlanGeneratorRequest,
    ):

        recommendation_request = FarmRecommendationRequest(
            city=request.city,
            garden_type=request.garden_type,
            garden_size=request.garden_size,
            sunlight=request.sunlight,
            water_availability=request.water_availability,

            # Temporary values
            # Will be replaced by WeatherService
            temperature=28,
            humidity=60,
            season="Summer",
        )

        recommendation_result = (
            self.intelligence_service.recommend_crops(
                recommendation_request,
            )
        )

        crops = self.intelligence_service.repository.get_all_crops()

        crop_lookup = {
            crop.id: crop
            for crop in crops
        }

        recommendations = []

        for recommendation in recommendation_result["recommendations"]:

            crop = crop_lookup.get(
                recommendation["id"],
            )

            if crop is None:
                continue

            planting_date = date.today()

            harvest_date = planting_date + timedelta(
                days=crop.harvest_days,
            )

            tasks = []

            sorted_tasks = sorted(
                crop.tasks,
                key=lambda task: task.day_number,
            )

            for task in sorted_tasks:

                tasks.append(
                    CropTaskResponse(
                        day=task.day_number,
                        title=task.title,
                        description=task.description,
                    )
                )

            recommendations.append(
                {
                    "crop_id": crop.id,
                    "crop_name": crop.name,
                    "score": recommendation["score"],
                    "planting_date": planting_date,
                    "expected_harvest_date": harvest_date,
                    "watering_frequency": crop.water_requirement,
                    "watering_schedule": self._generate_watering_schedule(
                        crop.water_requirement,
                    ),
                    "timeline": self._generate_timeline(
                        crop,
                    ),
                    "tasks": tasks,
                    "sustainability_tips": self._generate_sustainability_tips(
                        crop,
                    ),
                    "progress": ProgressResponse(
                        current_day=0,
                        total_days=crop.harvest_days,
                        remaining_days=crop.harvest_days,
                    ),
                }
            )

        return {
            "recommendations": recommendations,
        }