// src/App.jsx  —  AgriBuddy 2.0  |  VIT_Coders
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FarmMap from './components/FarmMap';
import InputPanel from './components/InputPanel';
import AnalysisBoard from './components/AnalysisBoard';
import ChatBot from './components/ChatBot';
import { getSoilByLatLon, getYieldPrediction } from './services/api';

// Simple toast component
function Toast({ message, onDone }) {
  const [hiding, setHiding] = React.useState(false);

  React.useEffect(() => {
    const hide = setTimeout(() => setHiding(true), 3200);
    const remove = setTimeout(() => onDone(), 3700);
    return () => { clearTimeout(hide); clearTimeout(remove); };
  }, [onDone]);

  return (
    <div className={`toast${hiding ? ' hide' : ''}`} role="status" aria-live="polite">
      <span>✅</span> {message}
    </div>
  );
}

function App() {
  const [farmData, setFarmData] = useState({
    crop: 'Rice',
    season: 'Kharif',
    state: 'Punjab',
    district: 'Rupnagar',
    lat: 30.97,
    lon: 76.53,
    annual_rainfall: 1100,
    soil_ph: 7.0,
    fertilizer: 150,
    pesticide: 10,
    reportLanguage: 'Hindi',
    reportScript: 'Native script',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [toast, setToast] = useState(null);

  const handleLocationFound = async (location) => {
    const { lat, lng, district, state } = location;
    try {
      const soilData = await getSoilByLatLon(lat, lng);
      setFarmData((prev) => ({
        ...prev,
        lat,
        lon: lng,
        district: district || prev.district,
        state: state || prev.state,
        annual_rainfall: soilData.avg_rainfall_mm,
        soil_ph: soilData.soil_ph,
      }));
    } catch (err) {
      console.warn('Could not fetch soil data, using fallback values.');
      setFarmData((prev) => ({
        ...prev,
        lat,
        lon: lng,
        district: district || prev.district,
        state: state || prev.state,
      }));
    }
  };

  // Debounced prediction
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (farmData.crop && farmData.state && farmData.lat && farmData.lon) {
        fetchPrediction();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [
    farmData.crop,
    farmData.season,
    farmData.state,
    farmData.lat,
    farmData.lon,
    farmData.fertilizer,
    farmData.pesticide,
  ]);

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const result = await getYieldPrediction(farmData);
      if (result.status === 'success' && result.prediction) {
        setPrediction(result.prediction.median_yield);
      } else {
        setPrediction(0);
      }
    } catch (err) {
      console.error('Prediction failed:', err);
      setPrediction(0);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    setLoadingReport(true);
    try {
      const response = await axios.post(
        '/generate-report',
        {
          crop: farmData.crop,
          season: farmData.season,
          state: farmData.state,
          lat: farmData.lat,
          lon: farmData.lon,
          fertilizer: farmData.fertilizer,
          pesticide: farmData.pesticide,
          language: farmData.reportLanguage,
          script: farmData.reportScript,
        },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);

      setToast(`Report generated in ${farmData.reportLanguage}!`);
    } catch (err) {
      console.error('Report generation failed:', err);
      alert('Could not generate report. Please check if the backend server is running and try again.');
    } finally {
      setLoadingReport(false);
    }
  };

  return (
    <div className="app-wrapper">
      {/* ── HEADER ── */}
      <header className="app-header" aria-label="AgriBuddy application header">
        <div className="header-inner">
          {/* Brand */}
          <div className="header-brand">
            <div className="header-logo-wrap" aria-hidden="true">🌾</div>
            <div>
              <div className="header-title">
                Agri<span>Buddy</span> AI
              </div>
              <div className="header-tagline">Your Smart Farming Companion — फसल का बेहतर भविष्य</div>
            </div>
          </div>

          {/* Status + team */}
          <div className="header-meta">
            <div className="header-status-pill">
              <span className="header-status-dot" aria-hidden="true"></span>
              System Operational
            </div>
            <div className="header-team">VIT_Coders • Smart Farming Initiative</div>
          </div>
        </div>
      </header>

      {/* ── MAIN DASHBOARD ── */}
      <main className="dashboard-body">
        <div className="dashboard-grid">
          {/* 1 — Map */}
          <div className="map-wrapper" role="region" aria-label="Farm location map">
            <div className="map-tooltip" aria-hidden="true">
              📍 Click anywhere on the map to select your farm location
            </div>
            <FarmMap onLocationFound={handleLocationFound} />
          </div>

          {/* 2 — Inputs */}
          <div>
            <InputPanel
              farmData={farmData}
              setFarmData={setFarmData}
              onGenerateReport={generateReport}
              loadingReport={loadingReport}
            />
          </div>

          {/* 3 — Analysis */}
          <div>
            <AnalysisBoard
              prediction={prediction}
              loading={loading}
              farmData={farmData}
            />
          </div>
        </div>
      </main>

      {/* ── CHATBOT ── */}
      <ChatBot farmData={farmData} prediction={prediction} />

      {/* ── TOAST ── */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

export default App;