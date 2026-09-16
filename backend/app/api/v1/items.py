from fastapi import APIRouter

router = APIRouter(prefix="/items", tags=["items"])


@router.get("")
def list_items():
    return {
        "items": [
            {
                "id": 1,
                "title": "Study Table Lamp",
                "category": "electronics",
                "condition": "good",
                "value": 250,
                "location": "hostel",
                "route": "sell",
                "status": "available",
            }
        ]
    }
