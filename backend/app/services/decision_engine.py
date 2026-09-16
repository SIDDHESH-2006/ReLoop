from typing import Literal

ItemRoute = Literal["sell", "donate", "exchange", "repair", "upcycle", "recycle"]


def route_item(condition: str, value: float, location: str, reusability: str) -> ItemRoute:
    """Return the best circular pathway for an item based on rough heuristics."""
    score = 0

    if condition.lower() in {"excellent", "good"}:
        score += 2
    elif condition.lower() in {"fair"}:
        score += 1

    if value > 1000:
        score += 2
    elif value > 200:
        score += 1

    if location.lower() == "campus":
        score += 1

    if reusability.lower() in {"high", "very high"}:
        score += 2
    elif reusability.lower() in {"medium"}:
        score += 1

    if score >= 5:
        return "sell"
    if score >= 4:
        return "donate"
    if score >= 3:
        return "exchange"
    if score >= 2:
        return "repair"
    if score == 1:
        return "upcycle"
    return "recycle"
