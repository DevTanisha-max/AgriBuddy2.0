# 🌾 AgriBuddy - Geospatial Digital Twin for Precision Agriculture

A geospatial digital twin platform that combines machine learning, real-time soil data, and interactive mapping to help farmers make data-driven decisions for crop yield prediction and sustainable farming.

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_App-00C7B7?style=for-the-badge&logo=render)](https://agribuddy2-0.onrender.com/)
[![GitHub Code](https://img.shields.io/badge/GitHub-View_Code-181717?style=for-the-badge&logo=github)](https://github.com/DevTanisha-max/AgriBuddy2.0)


## 📌 Overview

AgriBuddy is an intelligent agricultural analytics platform that empowers farmers, agricultural professionals, and policymakers with data-driven insights. By integrating geospatial data, machine learning, real-time soil intelligence, and multilingual interfaces, it bridges the gap between traditional farming and precision agriculture.

"Smart farming starts with smart data."

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🗺️ Interactive Geospatial Map | Click on the map to auto-capture GPS coordinates and reverse-geocode district/state |
| 🌱 Automated Soil Profile Lookup | Smart injection of N, P, K, pH values from internal district-level database |
| 🤖 ML-Powered Yield Prediction | XGBoost Regressor trained on 10-feature vector (soil chemistry, weather, crop, season) |
| 📊 Real-Time Dashboard | Visualize predicted yield, confidence metrics, and historical trends with Chart.js |
| 📄 Multi-Language Report Generation | Generate detailed crop reports in Hindi, English, and other Indian languages |
| 🤖 AI Chatbot Assistant | Groq-powered chatbot for farming advice, crop selection, and pest control |
| 📥 PDF Report Download | Download comprehensive reports in PDF format with Hindi script support |
| ☁️ Cloud-Native Architecture | Docker containerization + Kubernetes orchestration with auto-scaling |

## 🧠 Core Concept: Digital Twin for Farming

AgriBuddy creates a digital twin of your farm by combining:

| Data Layer | Source |
|---|---|
| Soil Chemistry | District-level database (N, P, K, pH) |
| Weather Data | Rainfall, temperature, humidity |
| Crop & Season | User-selected from 55+ crop varieties |
| Farm Inputs | Fertilizer intensity, pesticide usage |
| Geospatial Location | GPS coordinates from interactive map |

1 prediction = 10 features → XGBoost → Yield forecast (kg/hectare)

## ⚙️ System Workflow

1. User clicks on map → GPS coordinates captured  
2. Reverse geocoding → District & State identified  
3. Soil profile lookup → N, P, K, pH auto-populated  
4. User selects → Crop, Season, Fertilizer, Pesticide  
5. ML Model predicts → Yield forecast with confidence  
6. Dashboard updates → Visual charts & insights  
7. Generate Report → PDF download in preferred language  
8. Chatbot assistance → AI-powered farming advice

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Backend | Python, FastAPI, Uvicorn |
| ML/MLOps | XGBoost, scikit-learn, pandas, numpy, joblib |
| Frontend | React 19, Vite, Leaflet.js, Chart.js |
| UI/Map | React-Leaflet, Axios |
| PDF Generation | ReportLab, fpdf2 (with Devanagari font support) |
| AI Chatbot | Groq API |
| Containerization | Docker |
| Orchestration | Kubernetes (HPA, rolling updates) |
| Database | District-level soil chemistry lookup (CSV-based) |

## 📁 Project Structure

```text
AgriBuddy2.0/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── soil_processing.py      # Soil data pipeline & injection
│   ├── train_model.py          # XGBoost model training script
│   ├── prepare_final_data.py   # Data preprocessing & feature engineering
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile              # Container image definition
│   ├── models/                 # Serialized ML artifacts
│   │   ├── yield_model.pkl
│   │   ├── le_crop.pkl         # 55+ crop varieties
│   │   ├── le_state.pkl
│   │   └── le_season.pkl
│   ├── data/                   # Training & soil lookup data
│   ├── static/                 # Static assets (fonts, images)
│   └── k8s/                    # Kubernetes manifests
│       ├── backend-deployment.yaml
│       └── backend-service.yaml
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AnalysisBoard.jsx   # Yield analysis dashboard
    │   │   ├── FarmMap.jsx         # Interactive geospatial map
    │   │   ├── InputPanel.jsx      # Prediction form with 55+ crops
    │   │   └── ChatBot.jsx         # AI-powered farming assistant
    │   ├── services/
    │   │   └── api.js              # Axios API client
    │   ├── App.jsx                 # Main application
    │   ├── index.css               # Global styling
    │   └── main.jsx                # React entry point
    ├── public/                     # Static files
    ├── package.json                # Node.js dependencies
    └── vite.config.js              # Vite build configuration
```

## 🚀 Local Setup Guide

### Prerequisites

Python 3.9+ – Download here  
Node.js 18+ – Download here  
Git – Download here  
pip (comes with Python)  
npm (comes with Node.js)

### Backend Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/DevTanisha-max/AgriBuddy2.0.git
cd AgriBuddy2.0
```

#### 2. Navigate to Backend & Create Virtual Environment

Windows:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

macOS / Linux:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Set Up Environment Variables

Create a `.env` file in the backend folder:

Windows:

```bash
echo GROQ_API_KEY=your_groq_api_key_here > .env
```

macOS/Linux:

```bash
echo "GROQ_API_KEY=your_groq_api_key_here" > .env
```

Get your free API key from Groq Console

#### 5. Run the FastAPI Server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server will be available at: http://localhost:8000  
API Documentation: http://localhost:8000/docs

### Frontend Setup

#### 1. Navigate to Frontend Directory

```bash
cd frontend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Start Development Server

```bash
npm run dev
```

Frontend will be available at: http://localhost:5173

## 🌍 Deployment

### Docker Deployment

Build Backend Image:

```bash
cd backend
docker build -t agribuddy-backend:latest .
docker run -p 8000:8000 agribuddy-backend:latest
```

Build Frontend Image:

```bash
cd frontend
docker build -t agribuddy-frontend:latest .
docker run -p 5173:5173 agribuddy-frontend:latest
```

### Kubernetes Deployment

```bash
kubectl apply -f backend/k8s/backend-deployment.yaml
kubectl apply -f backend/k8s/backend-service.yaml
kubectl get pods
kubectl get services
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| /get-soil-by-latlon | POST | Get soil parameters (N, P, K, pH) via GPS coordinates |
| /predict | POST | Predict crop yield using 10-feature vector |
| /generate-report | POST | Generate multi-language PDF report |
| /chat | POST | AI-powered farming chatbot (Groq) |
| /health | GET | Health check endpoint |

## 🗺️ Frontend Features

### Interactive Map (FarmMap)

- Click anywhere to select farm location
- Auto-reverse geocoding → District/State
- Auto-populated soil data from backend

### Prediction Form (InputPanel)

- 55+ Crop Varieties – Rice, Wheat, Maize, Cotton, Sugarcane, Banana, and more
- Season Selection – Kharif, Rabi, Summer
- Fertilizer & Pesticide sliders for input intensity
- Auto-filled soil parameters

### Analysis Dashboard (AnalysisBoard)

- Predicted yield (tons/hectare)
- Confidence metrics & accuracy
- Estimated market value (MSP-based)
- Seasonal comparison charts
- Yield quality assessment

### Chatbot Assistant (ChatBot)

- AI-powered farming advice
- Crop selection guidance
- Pest control & fertilizer recommendations
- Weather impact analysis

### Report Generation

- Languages: Hindi, English, and other Indian languages
- Scripts: Native Script (Devanagari) & Roman
- PDF Download – Complete crop report with all parameters

## 📊 Machine Learning Model

Algorithm: XGBoost Regressor

Input Features (10-vector):

- Nitrogen (N) – mg/kg
- Phosphorus (P) – mg/kg
- Potassium (K) – mg/kg
- Soil pH – unitless
- Rainfall – mm
- Temperature – °C
- Humidity – %
- Crop (encoded)
- Season (encoded)
- State (encoded)

Output: Crop yield prediction (kg/hectare)

Training Data: Historical agricultural records with validated soil and weather measurements across 55+ crop varieties

## 📦 Dependencies

### Backend Requirements

```text
fastapi==0.115.11
uvicorn[standard]==0.34.0
pydantic==2.10.6
python-multipart==0.0.20
scikit-learn==1.6.1
torch==2.6.0
numpy==2.2.3
scipy==1.15.2
joblib==1.4.2
groq==0.16.0
python-dotenv==1.0.1
pandas==2.2.3
matplotlib==3.10.0
seaborn==0.13.2
reportlab==4.2.5
fpdf2==2.8.1
weasyprint==64.1
```

### Frontend Dependencies

```text
react@^18.2.0
react-dom@^18.2.0
react-leaflet@^4.2.1
leaflet@^1.9.4
chart.js@^4.4.0
react-chartjs-2@^5.2.0
axios@^1.6.0
vite@^5.0.0
```

## 🌍 Project Impact

### 🌱 Agricultural Impact

- Data-Driven Decisions: Farmers get precise yield predictions
- Reduced Waste: Optimized fertilizer and pesticide usage
- Better Crop Selection: 55+ crop varieties with seasonal advice
- Soil Health Monitoring: Automated soil parameter tracking

### 💰 Economic Impact

| Stakeholder | Benefit |
|---|---|
| Farmers | Higher yields, lower input costs, better market prices |
| Policymakers | Data-driven agricultural policies |
| Agribusiness | Better supply chain planning |
| Researchers | Access to agricultural data |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

- Fork the repository
- Create a feature branch: git checkout -b feature/YourFeature
- Commit changes: git commit -m 'Add some feature'
- Push to branch: git push origin feature/YourFeature
- Open a Pull Request

## 📄 License

This project is licensed under the MIT License – see the LICENSE file for details.

## 👨‍💻 Contributors

Tanisha Sharma (DevTanisha-max)  
Sparsh Kapoor (SparshKapoor-CODER)

## 🙏 Acknowledgments

XGBoost – ML framework for yield prediction  
FastAPI – High-performance backend framework  
Groq – AI-powered chatbot API  
Leaflet.js – Interactive mapping library  
ReportLab – PDF generation with multi-language support

## 📞 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

## ⭐ Show Your Support

If this project helps you or inspires you, please consider giving it a star on GitHub ⭐.

Built with ❤️ for precision agriculture | MIT License
