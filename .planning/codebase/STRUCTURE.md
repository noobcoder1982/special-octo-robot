# Project Structure

## Root
- `backend/`: Node.js/Express server and AI services.
- `src/`: React/Vite frontend application.
- `.planning/`: GSD intelligence and codebase blueprints.
- `public/`: Static assets and icons.

## Backend Detail
- `controllers/`: Request handlers (AI, Auth, Tasks, Users).
- `models/`: MongoDB/Mongoose schemas.
- `routes/`: API endpoint definitions.
- `services/`: Core logic (NVIDIA NIM integration).
- `middleware/`: Auth and validation layers.
- `config/`: DB and environment configuration.

## Frontend (src) Detail
- `components/`: UI modules (MissionLab, Marketplace, etc.).
- `components/ui/`: Atomic UI components (Button, Input).
- `lib/`: Utility functions and API helpers.
- `assets/`: Global styles and local images.
- `App.tsx`: Main routing and layout orchestration.
