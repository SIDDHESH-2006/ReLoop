# Reloop

Reloop is a campus-first circular economy platform that helps students give unwanted items a second life through sell, donate, exchange, repair, upcycle, and recycle flows.

## Project Structure

```text
reloop/
├─ frontend/
│  ├─ app/
│  │  ├─ (auth)/
│  │  │  ├─ login/
│  │  │  └─ signup/
│  │  ├─ dashboard/
│  │  ├─ items/
│  │  ├─ map/
│  │  ├─ chat/
│  │  ├─ profile/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ navbar.tsx
│  │  ├─ item-card.tsx
│  │  ├─ campus-map.tsx
│  │  ├─ chat-panel.tsx
│  │  └─ filters.tsx
│  ├─ lib/
│  │  ├─ api.ts
│  │  ├─ utils.ts
│  │  └─ constants.ts
│  ├─ public/
│  │  └─ assets/
│  ├─ package.json
│  ├─ next.config.js
│  ├─ tsconfig.json
│  └─ tailwind.config.ts
├─ backend/
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ v1/
│  │  │  │  ├─ auth/
│  │  │  │  ├─ items/
│  │  │  │  ├─ users/
│  │  │  │  ├─ chat/
│  │  │  │  ├─ hubs/
│  │  │  │  └─ decisions/
│  │  │  └─ health.py
│  │  ├─ core/
│  │  │  ├─ config.py
│  │  │  ├─ security.py
│  │  │  └─ logger.py
│  │  ├─ db/
│  │  │  ├─ base.py
│  │  │  ├─ session.py
│  │  │  └─ init_db.py
│  │  ├─ models/
│  │  │  ├─ user.py
│  │  │  ├─ item.py
│  │  │  ├─ transaction.py
│  │  │  ├─ hub.py
│  │  │  └─ repair.py
│  │  ├─ schemas/
│  │  │  ├─ user.py
│  │  │  ├─ item.py
│  │  │  ├─ transaction.py
│  │  │  └─ hub.py
│  │  ├─ services/
│  │  │  ├─ item_service.py
│  │  │  ├─ decision_engine.py
│  │  │  ├─ marketplace_service.py
│  │  │  ├─ repair_service.py
│  │  │  └─ chat_service.py
│  │  ├─ utils/
│  │  │  ├─ geolocation.py
│  │  │  ├─ image_classifier.py
│  │  │  └─ pricing.py
│  │  └─ main.py
│  ├─ requirements.txt
│  ├─ Dockerfile
│  └─ .env.example
├─ data/
│  ├─ mock_data/
│  │  ├─ items.json
│  │  ├─ users.json
│  │  └─ hubs.json
│  └─ seed.sql
├─ docs/
│  ├─ architecture.md
│  ├─ api-spec.md
│  └─ user-flows.md
├─ docker-compose.yml
├─ .gitignore
├─ .env.example
└─ Makefile
```

## Core Modules

- Marketplace: buy, sell, donate, exchange
- Repair & refurbishment: report damaged items and find repair hubs
- Waste routing: recycle or upcycle based on item condition
- Campus map: nearby buyers, donors, hubs, and drop-off locations
- Chat & coordination: direct communication between students and hubs
- Decision engine: classify an item into the best next-use pathway

## Product Goals

- Reduce campus waste
- Increase reuse and recovery of usable items
- Make hostel vacating easier and more sustainable
- Create a single source for circular-item logistics

## Suggested Tech Stack

- Frontend: Next.js + React + TypeScript + Tailwind CSS
- Backend: FastAPI + Python
- Database: PostgreSQL
- Real-time: WebSockets / Socket.IO
- AI: image recognition and recommendation model integration
- Maps: Leaflet or Google Maps integration

## Getting Started

1. Create the frontend app with Next.js.
2. Create the backend with FastAPI.
3. Add PostgreSQL schema for users, items, hubs, and transactions.
4. Implement item listing and campus map flows.
5. Connect the decision engine for routing items.

## Notes

This structure is intentionally designed for a hackathon MVP and can be extended into a production campus circular-economy platform.
