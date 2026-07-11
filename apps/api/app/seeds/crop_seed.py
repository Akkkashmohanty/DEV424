from typing import List

CROPS: List[dict] = [
    {
        "name": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "category": "Vegetables",
        "difficulty": "Medium",
        "description": "Popular fruiting vegetable suitable for balcony gardens.",
        "ideal_temperature_min": 20,
        "ideal_temperature_max": 30,
        "humidity_min": 50,
        "humidity_max": 70,
        "rainfall_preference": "Moderate",
        "sunlight_requirement": "Full Sun",
        "water_requirement": "Medium",
        "soil_type": "Loamy",
        "ph_min": 6.0,
        "ph_max": 6.8,
        "spacing_cm": 45,
        "harvest_days": 90,
        "image_url": None,
        "companion_plants": "Basil,Marigold",
        "common_diseases": "Early Blight,Late Blight",
        "seasons": [
            "Summer",
            "Winter",
        ],
        "tasks": [
            {
                "day": 1,
                "title": "Sow Seeds",
                "description": "Plant tomato seeds in seed trays.",
            },
            {
                "day": 15,
                "title": "Transplant",
                "description": "Move seedlings to larger containers.",
            },
            {
                "day": 30,
                "title": "Apply Compost",
                "description": "Feed plants with organic compost.",
            },
            {
                "day": 60,
                "title": "Flowering Check",
                "description": "Monitor flowering and pests.",
            },
            {
                "day": 90,
                "title": "Harvest",
                "description": "Harvest ripe tomatoes.",
            },
        ],
    },
]