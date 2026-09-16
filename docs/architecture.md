# Reloop Architecture

## Overview

Reloop is designed as a campus circular economy platform for students to reuse, repair, exchange, and recycle unwanted items.

## User Flow

1. User lists an item they no longer need.
2. System evaluates item condition, value, and location.
3. Decision engine selects the optimal route: sell, donate, exchange, repair, upcycle, or recycle.
4. Item is shown in campus marketplace or mapped to nearby hubs.
5. Student or campus services coordinate pickup, exchange, or drop-off.

## Main Components

- Frontend marketplace UI
- Backend REST API layer
- PostgreSQL data layer
- Decision engine for item routing
- Campus map and local hub discovery
- Chat layer for coordination

## Decision Engine Logic

The engine should use a combination of:

- item condition
- resale value
- estimated reusability
- campus proximity
- repair feasibility
- waste classification

## MVP Priorities

- Add item listing
- Create campus map with nearby hubs
- Show recommended route and action
- Allow chat and message coordination
- Support sell/donate/exchange flows
