# System Architecture

## Overview
The platform follows a decoupled client-server architecture designed for high-fidelity AI-driven operations.

## 1. Intelligence Layer (Backend Services)
- **AI Service (`ai.service.js`)**: The core brain. Interfaces with NVIDIA NIM to synthesize mission data and career directives.
- **Controllers**: Handle API requests, orchestrating between the AI service, MongoDB models, and auth middleware.
- **Models**: MongoDB schemas for Users, Tasks, Inventory, and Skills, providing the data context for AI synthesis.

## 2. Communication Layer (REST API)
- **Express Router**: Standardized endpoints for Auth, AI, Tasks, and Users.
- **Middleware**: JWT authentication and error handling for operational stability.

## 3. High-Fidelity UI Layer (Frontend)
- **Core Components**: Specialized modules like `MissionLab`, `TacticalIntelligence`, and `MapIntelligencePage` that visualize AI outputs.
- **Global Layout**: `AppLayout` and `Sidebar` provide the strategic frame for all operational modules.
- **State & Sync**: Managed via React hooks and custom API utility (`api.ts`).

## 4. Data Flow
1. **Raw Input**: Volunteer/Coordinator enters data (e.g., Mission Lab description).
2. **Synthesis**: Backend sends context-rich prompts to NVIDIA NIM.
3. **Intelligence Delivery**: AI response is processed and stored/returned.
4. **Visual Execution**: Frontend renders high-fidelity tactical directives (e.g., Mission Blueprints).
