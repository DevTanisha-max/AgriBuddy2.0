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
| 🤖 ML-Powered Yield Prediction | Random Forest (median) + Neural Networks (80% prediction interval) trained on 13‑feature vector (soil chemistry, rainfall, crop, season, state, farm inputs) |
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

1 prediction = 10 features → ML → Yield forecast (kg/hectare)

## ⚙️ System Workflow

1. User clicks on map → GPS coordinates captured  
2. Reverse geocoding → District & State identified  
3. Soil profile lookup → N, P, K, pH auto-populated  
4. User selects → Crop, Season, Fertilizer, Pesticide  
5. ML Model predicts → Yield forecast with confidence  
6. Dashboard updates → Visual charts & insights  
7. Generate Report → View Report in preferred language
8. Chatbot assistance → AI-powered farming advice

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Backend | Python, FastAPI, Uvicorn |
| ML/MLOps | scikit-learn, PyTorch, pandas, numpy, joblib, scipy |
| Frontend | React 19, Vite, Leaflet.js, Chart.js |
| UI/Map | React-Leaflet, Axios |
| AI Chatbot | Groq API |
| Containerization | Docker |
| Orchestration | Kubernetes (HPA, rolling updates) |
| Database | File-based storage (CSV for raw data, joblib/PyTorch serialized files for models, geo KDTree pickle) |

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

[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/downloads/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Git](https://img.shields.io/badge/Git-Download-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/downloads)

### Backend Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/SparshKapoor-CODER/AgriBuddy2.0.git
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

Get your free `Groq API key` at [console.groq.com](https://console.groq.com)

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

## 🗺️ Frontend Features

### Interactive Map (FarmMap)

- Click anywhere to select farm location
- Auto-reverse geocoding → District/State
- Auto-populated soil data from backend

### Prediction Form (InputPanel)

- 55+ Crop Varieties – Rice, Wheat, Maize, Cotton, Sugarcane, Banana, and more
- Season Selection – Kharif, Rabi, Whole Year
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
- View Report – Complete crop report with all parameters

## 📊 Machine Learning Models

| Component | Model | Framework | Target Transform |
|-----------|-------|-----------|------------------|
| **Median (point estimate)** | Random Forest Regressor | scikit‑learn | None (raw yield) |
| **Lower quantile (τ = 0.1)** | Neural Network with pinball loss | PyTorch | `log1p(yield)` |
| **Upper quantile (τ = 0.9)** | Neural Network with pinball loss | PyTorch | `log1p(yield)` |

The system returns an **80% prediction interval** (10th–90th percentiles) alongside the median point estimate, providing both a best guess and a measure of uncertainty.

---

### 📥 Input Features (13‑vector)

| # | Feature | Description |
|---|---------|-------------|
| 1 | `Crop_target_enc` | Target‑encoded crop: `log(mean yield per crop)` – captures crop‑specific baseline productivity |
| 2–6 | `Season_Kharif`, `Season_Rabi`, `Season_Summer`, `Season_Whole Year`, `Season_Winter` | One‑hot encoded season (5 dummies, first category dropped) |
| 7 | `State` | Label‑encoded Indian state (from training set) |
| 8 | `Annual_Rainfall` | Rainfall (mm/year) – retrieved from nearest GEE grid point via KDTree |
| 9 | `Fertilizer_per_ha` | Fertilizer usage per hectare (`Fertilizer / Area`) |
| 10 | `Pesticide_per_ha` | Pesticide usage per hectare (`Pesticide / Area`) |
| 11 | `log_Area` | Log‑transformed cultivated area (`log1p(Area)`) |
| 12 | `Nitrogen` | Soil nitrogen (mg/kg) – state‑level average |
| 13 | `Soil Ph` | Soil pH – state‑level average from GEE |

> **Dropped features:** Phosphorus and Potassium were removed because, after state‑level aggregation, they showed near‑constant variance and did not improve predictive performance. Temperature and humidity are not available in the dataset.

---

### 📤 Output

- **Point estimate:** Median crop yield (tons/hectare) – from Random Forest
- **Uncertainty interval:** 80% prediction interval (10th and 90th percentiles) – from quantile neural networks
- **Example response:**
  ```json
  {
    "median": 2.34,
    "lower_bound": 0.87,
    "upper_bound": 6.12,
    "units": "tons/hectare"
  }
  ```

---

### 📚 Training Data

- **Source:** Historical agricultural records from India (1997–2015)
- **Crops:** 55+ crop varieties
- **Geographic coverage:** All major Indian states
- **Raw records:** 19,689 rows
- **After cleaning:** 19,525 rows (outliers with `Yield > 1000` removed)
- **Original columns:** Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide
- **Enrichment:** Soil nutrients (N, P, K, pH) merged at the state level from a district‑level soil lookup (averaged per state)
- **Pre‑processing pipeline:**
  1. Normalise fertilizer and pesticide by area → `Fertilizer_per_ha`, `Pesticide_per_ha`
  2. Log‑transform area → `log_Area`
  3. Target‑encode crop → `Crop_target_enc` (log of mean yield per crop)
  4. One‑hot encode Season → 5 dummy variables
  5. Remove extreme yield outliers
  6. Label‑encode State
  7. Standardise numerical features (`StandardScaler`)
  8. Train/validation/test split (70/15/15 stratified by State)

---

### ⚙️ Key Implementation Notes

- **No traditional database** – all data and models are stored as files (CSV, `.npy`, `.pkl`, `.pt`).
- **Geospatial lookup:** A KDTree index built over 1,137 GEE grid points enables sub‑millisecond retrieval of rainfall and soil pH from a map click (latitude/longitude).
- **Model persistence:**
  - Random Forest → `joblib`
  - Neural networks → PyTorch `.pt`
  - Encoders and scaler → `joblib`
- **Deployment:** All artifacts are pre‑computed and loaded at FastAPI startup, enabling low‑latency predictions.
- **Prediction flow:**
  1. User clicks map → get lat/lon
  2. Query KDTree → retrieve rainfall and pH
  3. User provides crop, season, state, area, fertilizer, pesticide
  4. Construct 13‑feature vector using the same transformations
  5. Scale and encode → feed into three models
  6. Return median + interval

---

### 🔧 Key Features Table Update

In the main README's **Key Features** table, replace the XGBoost line with this corrected row:

| Feature | Description |
|---------|-------------|
| 🤖 ML-Powered Yield Prediction | Random Forest (median) + Neural Networks (80% prediction interval) trained on 13‑feature vector (soil chemistry, rainfall, crop, season, state, farm inputs) |



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

<a href="https://github.com/SparshKapoor-CODER/AgriBuddy2.0/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SparshKapoor-CODER/AgriBuddy2.0" />
</a>

## 🙏 Acknowledgments

[@syed-naqi-abbas](https://github.com/syed-naqi-abbas) and team for making the initial setup


## ⭐ Show Your Support

If this project helps you or inspires you, please consider giving it a star on GitHub ⭐.

Built with ❤️ for precision agriculture | MIT License
