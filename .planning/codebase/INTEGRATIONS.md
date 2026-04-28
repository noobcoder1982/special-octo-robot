# External Integrations

## AI Intelligence
- **NVIDIA NIM API**: Primary engine for neural synthesis and tactical reasoning.
  - **Endpoints Used**: Chat completion for mission analysis, career pathing, and dashboard intelligence.
  - **Authentication**: API Key managed via `.env` (BACKEND_NVIDIA_API_KEY).

## Database
- **MongoDB Atlas**: Cloud-hosted NoSQL database for persistence of users, missions, and operational logs.
  - **Connection**: Managed via Mongoose in `backend/config/db.js`.

## Geospatial Services
- **Custom Mapping**: Synthetic geographic overlays and sector "heat" rings implemented in `MapIntelligencePage.tsx`.

## Frontend Utilities
- **Hugeicons**: Premium icon set for operational UI clarity.
- **Framer Motion**: High-fidelity animation engine for tactical transitions.
