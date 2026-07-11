from app.db.database import SessionLocal

from app.models.crop import Crop
from app.models.crop_season import CropSeason
from app.models.crop_task import CropTask

import json
from pathlib import Path

DATA_FILE = Path(__file__).parent / "crop_data.json"

with open(DATA_FILE, "r", encoding="utf-8") as file:
    CROPS = json.load(file)


def seed_crops():
    db = SessionLocal()

    try:

        existing = db.query(Crop).count()

        if existing > 0:
            print("Crop database already seeded.")
            return

        for crop_data in CROPS:

            crop = Crop(
                name=crop_data["name"],
                scientific_name=crop_data["scientific_name"],
                category=crop_data["category"],
                difficulty=crop_data["difficulty"],
                description=crop_data["description"],
                ideal_temperature_min=crop_data["ideal_temperature_min"],
                ideal_temperature_max=crop_data["ideal_temperature_max"],
                humidity_min=crop_data["humidity_min"],
                humidity_max=crop_data["humidity_max"],
                rainfall_preference=crop_data["rainfall_preference"],
                sunlight_requirement=crop_data["sunlight_requirement"],
                water_requirement=crop_data["water_requirement"],
                soil_type=crop_data["soil_type"],
                ph_min=crop_data["ph_min"],
                ph_max=crop_data["ph_max"],
                spacing_cm=crop_data["spacing_cm"],
                harvest_days=crop_data["harvest_days"],
                image_url=crop_data["image_url"],
                companion_plants=crop_data["companion_plants"],
                common_diseases=crop_data["common_diseases"],
            )

            db.add(crop)
            db.flush()

            for season in crop_data["seasons"]:

                db.add(
                    CropSeason(
                        crop_id=crop.id,
                        season=season,
                    )
                )

            for task in crop_data["tasks"]:

                db.add(
                    CropTask(
                        crop_id=crop.id,
                        day_number=task["day"],
                        title=task["title"],
                        description=task["description"],
                    )
                )

        db.commit()

        print("Crop seed completed successfully.")

    except Exception as e:

        db.rollback()

        raise e

    finally:

        db.close()


if __name__ == "__main__":
    seed_crops()