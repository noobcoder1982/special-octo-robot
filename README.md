# ImpactQuest | Smart Humanitarian Coordination

ImpactQuest is a next-generation humanitarian platform that leverages AI-driven intelligence to coordinate volunteer efforts, manage disaster relief logistics, and automate tactical mission planning. Built for NGOs and operational responders, it transforms raw data into actionable humanitarian impact.

## 🚀 Vision
In crisis scenarios, time is the ultimate resource. ImpactQuest eliminates coordination friction by using Neural Intelligence Layers (powered by NVIDIA NIM) to match the right people to the right missions instantly.

## 🛠 Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **AI Engine**: NVIDIA NIM (Gemma 3), custom heuristic fallback models
- **Auth**: Firebase Authentication (Google & Email)
- **Maps**: MapLibre GL / Tactical Map Intelligence

## 🧠 AI Intelligence Layer
The platform features a modular AI architecture:
- **Volunteer Matching**: Deep skill-alignment and reliability scoring.
- **Mission Planning**: Automated generation of operational steps and risk assessments.
- **Smart Summaries**: Incident report synthesis for rapid situational awareness.
- **Resource Insights**: Predictive shortage detection and allocation suggestions.
- **Admin Copilot**: Strategic communication and scheduling assistant.

## 📁 Project Structure
```text
/
├── src/                # Frontend React Application
├── public/             # Static Assets
├── backend/            # Node.js API Service
│   ├── ai/             # Modular AI Intelligence Engines
│   ├── config/         # Production-safe configurations
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth & Security layers
│   ├── models/         # Mongoose Data Schemas
│   ├── services/       # Business logic & AI orchestration
│   └── utils/          # Common utilities
├── docs/               # Documentation
└── README.md
```

## 🛠 Local Setup

### 1. Prerequisites
- Node.js v18+
- MongoDB instance (local or Atlas)
- NVIDIA API Key

### 2. Installation
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..
npm install
```

### 3. Environment Config
Copy `.env.example` to `.env` in both the root and `backend` folders and fill in your credentials.

### 4. Launch
Run the mission control launcher:
```powershell
./start_all.ps1
```

## 🚢 Deployment
- **Frontend**: Optimized for Vercel.
- **Backend**: Optimized for Railway or Render.
- **Database**: MongoDB Atlas.

## 📈 Roadmap
- [ ] Real-time satellite imagery integration
- [ ] Offline-first mobile PWA for field use
- [ ] Blockchain-verified impact credentials
- [ ] Multilingual emergency translation layer

---
**ImpactQuest** | *Intelligence for Humanity.*
