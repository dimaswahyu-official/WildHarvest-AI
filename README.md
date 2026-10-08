# 🌲 WildHarvest AI

**WildHarvest AI** is a 100% offline, local-first campfire recipe generator built for hikers, campers, and foragers. This project is an official submission for the **Hacktoberfest 2026 DEV Challenge (Week 1: Touch Grass)**.

When you are deep in the woods, you don't have internet access. This application solves that by running a local AI model to turn your foraged ingredients into safe, actionable campfire recipes without needing a single bar of cell service.

## ✨ Features
* **100% Offline Inference:** Powered by Google's open-weight Gemma model running entirely on your local machine via Ollama.
* **Strict Ingredient Bounding:** The AI is highly constrained to *only* use the ingredients you actually found, plus basic camping supplies (water, salt, oil, etc.). No hallucinated ingredients!
* **Campfire Ready:** Recipes are designed to be cooked outdoors using basic mess kits or portable stoves.

## 🛠️ Tech Stack
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **AI Integration:** Ollama (Local LLM Server), `ollama` Node.js SDK
* **Model:** Google Gemma (7B)

## 🚀 How to Run Locally

Because this app uses local AI, you need to set up the model on your machine first.

### Prerequisites
1. **Node.js** (v22.23.2 via NVM is recommended for optimal compatibility).
2. **Ollama**: Download and install from [ollama.com](https://ollama.com/).

### Step 1: Start the Local AI
Open your terminal and pull the Gemma model. This will also start the Ollama background server.
```bash
ollama run gemma:7b