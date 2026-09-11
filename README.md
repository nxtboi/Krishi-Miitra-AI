# 🌾 Krishi Mitra AI (कृषि मित्र AI)
### Intelligent Multilingual AI Farming Companion for Indian Farmers

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google%20Gemini-GenAI-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Open-Meteo](https://img.shields.io/badge/Weather-Open--Meteo-FFA500)](https://open-meteo.com/)

</div>

---

## 📖 Overview

**Krishi Mitra AI (कृषि मित्र AI)** is a full-featured, AI-powered digital agronomy platform built to empower Indian farmers with real-time solutions to day-to-day agricultural challenges. Designed with rural accessibility in mind, it provides seamless **voice-based interaction**, **multimodal crop image diagnostics**, **hyperlocal real-time weather analytics**, an **AI-driven irrigation scheduler**, and **localized farm supplies access** in **11 Indian languages**.

Whether dealing with sudden pest infestations, unpredictable monsoon rain, optimal pesticide spraying windows, or crop cycle planning, Krishi Mitra AI acts as an always-accessible digital extension officer in the farmer's pocket.

---

## ✨ Key Features

### 🎙️ 1. Voice & Text AI Agronomist
- **Voice-First Input:** Integrated Web Speech Recognition tuned for Indian regional accents and phonetics (`hi-IN`, `pa-IN`, `bn-IN`, `mr-IN`, `gu-IN`, `te-IN`, `kn-IN`, etc.).
- **Conversational Streaming AI:** Real-time, step-by-step guidance on crop rotation, pest control, soil nutrient management, and government agricultural schemes.
- **Multimodal Plant Pathology:** Upload images of diseased leaves, infested crops, or soil samples to receive immediate visual diagnostics and practical remedy plans.
- **Smart Chat History:** Auto-generates descriptive titles for conversations with full session persistence and retrieval.

### 🌤️ 2. Real-Time Geolocation Farm Weather Widget
- **Device GPS Coordinate Detection:** Automatically queries the device's geolocation (`navigator.geolocation`) with reverse-geocoding via OpenStreetMap Nominatim to identify the farmer's exact district and state.
- **Microclimate Metrics:** Live temperature, "feels like" apparent temperature, relative air humidity, current-hour rainfall probability, and peak daily rain risk.
- **Actionable Farming Advisories:**
  - **Foliar Spraying Windows:** Alerts farmers when rain or excessive winds make pesticide/fertilizer spraying unsafe or ineffective.
  - **Irrigation Guidance:** Advises pausing irrigation ahead of forecasted rainfall to conserve groundwater and avoid waterlogging.
  - **Disease Risk Alerts:** Flags high humidity conditions conducive to fungal blights and mildew.
- **Forecast Breakdown:** 8-hour hourly intervals and 3-day weather forecast with rainfall probabilities and temperature ranges.
- **Flexible Region Switcher:** Allows searching any village/district across India or switching between prominent agricultural belt presets.

### 💧 3. Custom Irrigation Planner
- **Precision Water Scheduling:** Generates customized watering plans based on:
  - **Crop Type:** Rice, Wheat, Maize, Cotton, Tomato, Potato, Sugarcane, Soybean, Onion, Mustard, etc.
  - **Crop Growth Stage:** Age in days.
  - **Soil Characteristics:** Alluvial, Black, Red, Laterite, Arid, Saline, Peaty, or Forest soil.
  - **Weather Context:** Sunny, Cloudy, or Rainy.
- **Actionable Output:** Frequency, water volume, optimal times of day, and water-saving methods (drip irrigation, mulching, furrow).

### 🛒 4. Auto-Upgraded Agricultural Supplies Marketplace
- **Smart Link Engine:** Automatically synthesizes high-conversion, domain-refined search and product URLs for Indian farmers across **BigHaat**, **AgriBegri**, **IFFCO Bazar**, **Amazon Kisan**, **IndiaMART**, and **Flipkart**.
- **Context-Aware Query Refinement:** Appends agricultural taxonomy (verified seeds, ISI tools, foliar grade fertilizers, wholesale manufacturers) so farmers bypass generic consumer items.
- **In-Chat Auto-Detection:** Scans AI agronomy responses for recommended inputs (e.g., Nano Urea, Neem Oil, Battery Sprayer, Drip Kit) and automatically injects one-tap purchase cards into the conversation.
- **Multi-Store Price Comparison:** Side-by-side drawer allowing quick rate checking between retail delivery and bulk B2B mandi quotes.
- **One-Tap Link Sharing:** Easy link copying with feedback notifications to facilitate WhatsApp sharing among village farmer groups.

### 🗣️ 5. 11 Supported Indian Languages
Entire platform and AI assistant natively support:
- **English**
- **हिन्दी (Hindi)**
- **ਪੰਜਾਬੀ (Punjabi)**
- **বাংলা (Bengali)**
- **मराठी (Marathi)**
- **ગુજરાતી (Gujarati)**
- **తెలుగు (Telugu)**
- **ಕನ್ನಡ (Kannada)**
- **मारवाड़ी (Marwari)**
- **हरियाणवी (Haryanvi)**
- **भोजपुरी (Bhojpuri)**

### 🛡️ 6. Admin Control Suite
- **User Management:** View registered farmers, profile data, and session statistics.
- **AI Playground:** Test and prompt-engineer agronomic responses across different models.
- **Translation Editor:** In-app inspection and editing of multilingual copy.
- **In-Browser Code Editor:** Live inspection of project files and configurations.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript |
| **Build Tool & Bundler** | Vite 6 |
| **Styling & UI** | Tailwind CSS, Lucide Icons, Poppins Typography |
| **Generative AI** | Google GenAI SDK (`@google/genai`), Gemini 2.0 Flash / Pro |
| **Speech Recognition** | Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) |
| **Weather & Geolocation**| Open-Meteo API, OpenStreetMap Nominatim, HTML5 Geolocation API |
| **Syntax Highlighting** | React Syntax Highlighter |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js** (version 18.x or higher recommended)
- **npm** or **yarn** / **pnpm**
- A Google Gemini API Key ([Get one at Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/nxtboi/krishi-mitra-ai.git
cd krishi-mitra-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` (or `.env`):
```bash
cp .env.example .env.local
```

Open `.env.local` and add your Gemini API Key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 5. Build for Production
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 🔐 Default Credentials

For quick local testing and evaluation, the following accounts are pre-configured in local storage:

| Account Type | Username / Phone | Password | Capabilities |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin` *(or `0000000000`)* | `Vijay@147896` | Full access to Admin Dashboard, Translation Editor, Playground & Users |
| **Demo Farmer** | `nxtboi` *(or `9999999999`)* | `147896` | Standard farmer profile with chat history and irrigation access |
| **Standard User** | `user` *(or `1234567890`)* | `user` | Standard farmer user account |

*(You can also click **Sign Up** to create a custom farmer profile with local state persistence.)*

---

## 📁 Project Structure

```
├── components/
│   ├── admin/                 # Administrator portal components
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminPage.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── CodeEditorPage.tsx
│   │   ├── PlaygroundPage.tsx
│   │   ├── TranslationsEditor.tsx
│   │   └── UserManagementPage.tsx
│   ├── icons/
│   │   └── Icons.tsx          # Custom SVG icons & visual badges
│   ├── ChatPage.tsx           # Main AI farming chat interface
│   ├── ChatWindow.tsx         # Message thread viewer with markdown rendering
│   ├── Dashboard.tsx          # Farmer home dashboard
│   ├── Header.tsx             # Navigation bar & language switcher
│   ├── InputBar.tsx           # Voice recognition & image attachment input
│   ├── IrrigationPlannerPage.tsx # AI irrigation schedule generator
│   ├── LanguageSelector.tsx   # Multilingual dropdown
│   ├── LoginPage.tsx          # Authentication entry
│   ├── MessageBubble.tsx      # Chat bubbles with syntax/markdown formatting
│   ├── ProfilePage.tsx        # Farmer details & farm parameters
│   ├── ShopPage.tsx           # Supplies catalog & external retail links
│   ├── SignupPage.tsx         # Farmer registration
│   └── WeatherWidget.tsx      # Real-time GPS farm weather component
├── hooks/
│   └── useVoiceRecognition.ts # Web Speech API voice capture hook
├── services/
│   ├── api.ts                 # Master system prompts and persona rules
│   ├── authService.ts         # User authentication & persistence
│   ├── chatHistoryService.ts  # Session storage & history management
│   ├── geminiService.ts       # Google GenAI SDK streaming & multimodal calls
│   ├── mockProducts.ts        # Farming tools & seeds data
│   ├── translations.ts        # Multilingual strings for all 11 languages
│   ├── weatherService.ts      # Open-Meteo & Nominatim reverse geocode client
│   └── weatherTranslations.ts # Weather widget localized strings
├── App.tsx                    # Root routing & authentication state
├── index.html                 # HTML shell and entry point
├── metadata.json              # Platform capabilities & permissions
├── package.json               # Project manifest and scripts
├── tsconfig.json              # TypeScript compilation rules
└── vite.config.ts             # Vite build & environment configuration
```

---

## 🌐 Geolocation & Permissions Note

- **Browser Geolocation:** When prompted, allow location permissions to let the app detect your field coordinates.
- **Iframe Sandboxes:** If running inside an iframe where location permissions may be restricted, the widget automatically falls back to your saved profile district or regional defaults, and allows manual search of any Indian district.

---

## 🤝 Contributing

Contributions, feedback, and feature suggestions are welcome!

1. Fork the project repository.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

<div align="center">
  <sub>Built with ❤️ for Indian Farmers • Powered by Vijay Prasad</sub>
</div>
