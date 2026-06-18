// src/components/InputPanel.jsx  —  AgriBuddy 2.0  |  VIT_Coders
import React from 'react';

const INDIAN_LANGUAGES = [
  "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi", "Kannada",
  "Kashmiri", "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi",
  "Nepali", "Odia", "Punjabi", "Sanskrit", "Santhali", "Sindhi", "Tamil",
  "Telugu", "Urdu", "English",
];

const InputPanel = ({ farmData, setFarmData, onGenerateReport, loadingReport }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmData({ ...farmData, [name]: value });
  };

  return (
    <div className="panel" role="region" aria-label="Simulation controls">
      <h2 className="panel-header">
        <span aria-hidden="true" style={{
          background: 'rgba(45,106,79,0.10)',
          padding: '7px 9px',
          borderRadius: '10px',
          fontSize: '1.1rem',
        }}>⚙️</span>
        Simulation Controls
      </h2>

      <div
        className="custom-scrollbar"
        style={{ overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        {/* ── LOCATION ── */}
        <div className="input-section" style={{ marginBottom: 0 }}>
          <div className="input-section-title">
            <span aria-hidden="true">📍</span> Farm Location
          </div>
          <div className="location-pill" aria-live="polite">
            <span aria-hidden="true">🗺️</span>
            <span>{farmData.district || '—'}, {farmData.state || '—'}</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '8px', fontStyle: 'italic' }}>
            Click the map on the left to update your location automatically.
          </div>
        </div>

        {/* ── CROP & SEASON ── */}
        <div className="input-section" style={{ marginBottom: 0 }}>
          <div className="input-section-title">
            <span aria-hidden="true">🌾</span> Crop &amp; Season
          </div>
          <div className="grid-2-col">
            <div>
              <label className="input-label" htmlFor="crop-select">
                <span>Crop</span>
              </label>
              <select
                id="crop-select"
                name="crop"
                value={farmData.crop}
                onChange={handleChange}
                className="input-field"
                aria-label="Select crop type"
              >
                <option value="">Select Crop</option>
                <option value="Arecanut">Arecanut</option>
                <option value="Arhar/Tur">Arhar/Tur</option>
                <option value="Bajra">Bajra</option>
                <option value="Banana">Banana</option>
                <option value="Barley">Barley</option>
                <option value="Black pepper">Black pepper</option>
                <option value="Cardamom">Cardamom</option>
                <option value="Cashewnut">Cashewnut</option>
                <option value="Castor seed">Castor seed</option>
                <option value="Coconut">Coconut</option>
                <option value="Coriander">Coriander</option>
                <option value="Cotton(lint)">Cotton(lint)</option>
                <option value="Cowpea(Lobia)">Cowpea(Lobia)</option>
                <option value="Dry chillies">Dry chillies</option>
                <option value="Garlic">Garlic</option>
                <option value="Ginger">Ginger</option>
                <option value="Gram">Gram</option>
                <option value="Groundnut">Groundnut</option>
                <option value="Guar seed">Guar seed</option>
                <option value="Horse-gram">Horse-gram</option>
                <option value="Jowar">Jowar</option>
                <option value="Jute">Jute</option>
                <option value="Khesari">Khesari</option>
                <option value="Linseed">Linseed</option>
                <option value="Maize">Maize</option>
                <option value="Masoor">Masoor</option>
                <option value="Mesta">Mesta</option>
                <option value="Moong(Green Gram)">Moong(Green Gram)</option>
                <option value="Moth">Moth</option>
                <option value="Niger seed">Niger seed</option>
                <option value="Oilseeds total">Oilseeds total</option>
                <option value="Onion">Onion</option>
                <option value="Other Rabi pulses">Other Rabi pulses</option>
                <option value="Other Cereals">Other Cereals</option>
                <option value="Other Kharif pulses">Other Kharif pulses</option>
                <option value="Other Summer Pulses">Other Summer Pulses</option>
                <option value="Peas & beans (Pulses)">Peas &amp; beans (Pulses)</option>
                <option value="Potato">Potato</option>
                <option value="Ragi">Ragi</option>
                <option value="Rapeseed &Mustard">Rapeseed &amp; Mustard</option>
                <option value="Rice">Rice</option>
                <option value="Safflower">Safflower</option>
                <option value="Sannhamp">Sannhamp</option>
                <option value="Sesamum">Sesamum</option>
                <option value="Small millets">Small millets</option>
                <option value="Soyabean">Soyabean</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Sunflower">Sunflower</option>
                <option value="Sweet potato">Sweet potato</option>
                <option value="Tapioca">Tapioca</option>
                <option value="Tobacco">Tobacco</option>
                <option value="Turmeric">Turmeric</option>
                <option value="Urad">Urad</option>
                <option value="Wheat">Wheat</option>
                <option value="other oilseeds">other oilseeds</option>
              </select>
            </div>
            <div>
              <label className="input-label" htmlFor="season-select">
                <span>Season / ऋतु</span>
              </label>
              <select
                id="season-select"
                name="season"
                value={farmData.season}
                onChange={handleChange}
                className="input-field"
                aria-label="Select farming season"
              >
                <option value="Kharif">🌧️ Kharif</option>
                <option value="Rabi">❄️ Rabi</option>
                <option value="Summer">☀️ Whole Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── INPUT INTENSITY ── */}
        <div className="input-section" style={{ marginBottom: 0 }}>
          <div className="input-section-title">
            <span aria-hidden="true">🧪</span> Input Intensity
          </div>

          {/* Fertilizer */}
          <div className="input-group" style={{ marginBottom: '18px' }}>
            <div className="input-label">
              <span>🌿 Fertilizer (kg/hectare)</span>
              <span style={{
                color: 'var(--leaf)',
                fontFamily: 'monospace',
                fontWeight: 800,
                fontSize: '0.9rem',
                background: 'var(--sky-green)',
                padding: '2px 8px',
                borderRadius: '6px',
              }}>
                {farmData.fertilizer} kg
              </span>
            </div>
            <input
              type="range"
              name="fertilizer"
              min="0"
              max="3000"
              value={farmData.fertilizer}
              onChange={handleChange}
              aria-label={`Fertilizer intensity: ${farmData.fertilizer} kg`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              <span>0 kg</span><span>3000 kg</span>
            </div>
          </div>

          {/* Pesticide */}
          <div className="input-group" style={{ marginBottom: 0 }}>
            <div className="input-label">
              <span>🛡️ Pesticide (kg/hectare)</span>
              <span style={{
                color: 'var(--harvest)',
                fontFamily: 'monospace',
                fontWeight: 800,
                fontSize: '0.9rem',
                background: '#fff8f0',
                padding: '2px 8px',
                borderRadius: '6px',
              }}>
                {farmData.pesticide} kg
              </span>
            </div>
            <input
              type="range"
              name="pesticide"
              min="0"
              max="10"
              step="0.5"
              value={farmData.pesticide}
              onChange={handleChange}
              aria-label={`Pesticide usage: ${farmData.pesticide} kg`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              <span>0 kg</span><span>10 kg</span>
            </div>
          </div>
        </div>

        {/* ── REPORT OPTIONS ── */}
        <div className="input-section" style={{ marginBottom: 0 }}>
          <div className="input-section-title">
            <span aria-hidden="true">📄</span> Report Options
          </div>

          <div className="input-group" style={{ marginBottom: '14px' }}>
            <label className="input-label" htmlFor="report-lang">
              Language / भाषा
            </label>
            <select
              id="report-lang"
              name="reportLanguage"
              value={farmData.reportLanguage || 'Hindi'}
              onChange={handleChange}
              className="input-field"
              aria-label="Select report language"
            >
              {INDIAN_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="input-group" style={{ marginBottom: '6px' }}>
            <div className="input-label">Script / लिपि</div>
            <div className="radio-group" role="radiogroup" aria-label="Select script type">
              <label className="radio-pill">
                <input
                  type="radio"
                  name="reportScript"
                  value="Native script"
                  checked={farmData.reportScript === 'Native script'}
                  onChange={handleChange}
                />
                Native Script
              </label>
              <label className="radio-pill">
                <input
                  type="radio"
                  name="reportScript"
                  value="Roman (transliterated)"
                  checked={farmData.reportScript === 'Roman (transliterated)'}
                  onChange={handleChange}
                />
                Roman
              </label>
            </div>
          </div>
        </div>

        {/* ── DOWNLOAD BUTTON ── */}
        <button
          onClick={onGenerateReport}
          disabled={loadingReport}
          className="btn-primary"
          aria-label={loadingReport ? 'Generating report, please wait' : 'Download detailed crop report'}
          aria-busy={loadingReport}
        >
          {loadingReport ? (
            <>
              <span className="animate-pulse">⏳</span> Generating Report…
            </>
          ) : (
            <>
              <span>📥</span> Download Detailed Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPanel;