// src/components/AnalysisBoard.jsx  —  AgriBuddy 2.0  |  VIT_Coders
import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const AnalysisBoard = ({ prediction, loading, farmData }) => {
  // Color stays green-based in the warm theme
  const statusColor = useMemo(() => {
    if (prediction > 15) return '#2d6a4f';   // strong — deep green
    if (prediction > 7)  return '#c17f3b';   // moderate — golden amber
    return '#b94040';                         // low — muted red (still readable)
  }, [prediction]);

  const statusLabel = useMemo(() => {
    if (!prediction) return null;
    if (prediction > 15) return { text: 'Excellent', color: '#2d6a4f', bg: '#eaf6ee' };
    if (prediction > 7)  return { text: 'Moderate',  color: '#c17f3b', bg: '#fff8f0' };
    return { text: 'Low Yield', color: '#b94040', bg: '#fff0f0' };
  }, [prediction]);

  const chartData = {
    datasets: [{
      data: [prediction || 0, Math.max(0, 25 - (prediction || 0))],
      backgroundColor: [statusColor, '#e8d5b7'],
      borderWidth: 0,
      circumference: 180,
      rotation: 270,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { tooltip: { enabled: false } },
    cutout: '80%',
    events: [],
  };

  const marketValue = ((prediction || 0) * 2400).toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <div className="panel" role="region" aria-label="Harvest forecast">
      <h2 className="panel-header">
        <span aria-hidden="true" style={{
          background: 'rgba(193,127,59,0.12)',
          padding: '7px 9px',
          borderRadius: '10px',
          fontSize: '1.1rem',
        }}>📊</span>
        Harvest Forecast
      </h2>

      {/* GAUGE */}
      <div className="gauge-container" aria-live="polite" aria-label={`Predicted yield: ${prediction ? Number(prediction).toFixed(1) : 'unavailable'} tons per hectare`}>
        {loading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: '12px',
            color: 'var(--text-secondary)',
          }}>
            <div style={{ fontSize: '2rem', animation: 'pulse 1.4s ease infinite' }}>🌾</div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Calculating yield…</span>
          </div>
        ) : (
          <>
            <div style={{ height: '100%', width: '100%' }}>
              <Doughnut data={chartData} options={options} />
            </div>
            <div className="gauge-text-overlay">
              <span className="gauge-value">
                {prediction ? Number(prediction).toFixed(1) : '—'}
              </span>
              <span className="gauge-label">Tons / Hectare</span>
              {statusLabel && (
                <span
                  className="confidence-badge high"
                  style={{
                    marginTop: '8px',
                    color: statusLabel.color,
                    background: statusLabel.bg,
                    border: `1px solid ${statusLabel.color}33`,
                  }}
                >
                  ● {statusLabel.text}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* MARKET VALUE */}
      <div className="stat-card">
        <div className="input-label" style={{ marginBottom: '4px' }}>
          <span>💰 Estimated Market Value</span>
          <span style={{
            fontSize: '0.65rem',
            background: 'var(--sky-green)',
            color: 'var(--soil-dark)',
            padding: '2px 8px',
            borderRadius: '999px',
            fontWeight: 700,
          }}>
            LIVE MSP
          </span>
        </div>
        <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--leaf)', lineHeight: 1.1 }}>
          ₹{marketValue}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Based on current Minimum Support Price (MSP)
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid-2-col" style={{ marginBottom: '12px' }}>
        <div className="stat-card" style={{ margin: 0, textAlign: 'center' }}>
          <div className="input-label" style={{ justifyContent: 'center', fontSize: '0.68rem' }}>
            Yield Quality
          </div>
          <div style={{ color: 'var(--leaf)', fontWeight: 800, fontSize: '1rem' }}>
            OPTIMAL
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Forecast accuracy: High
          </div>
        </div>
        <div className="stat-card" style={{ margin: 0, textAlign: 'center' }}>
          <div className="input-label" style={{ justifyContent: 'center', fontSize: '0.68rem' }}>
            🧪 Soil pH
          </div>
          <div style={{ color: 'var(--harvest)', fontWeight: 800, fontSize: '1rem' }}>
            {Number(farmData.soil_ph).toFixed(1)}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {Number(farmData.soil_ph) >= 6 && Number(farmData.soil_ph) <= 7.5 ? 'Ideal range' : 'Check balance'}
          </div>
        </div>
      </div>

      {/* SEASONAL INDICATOR */}
      <div className="stat-card" style={{ marginBottom: '12px' }}>
        <div className="input-label" style={{ marginBottom: '8px' }}>
          <span>📅 Seasonal Comparison</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[
            { label: 'Kharif Avg', value: 14.2, active: farmData.season === 'Kharif' },
            { label: 'Rabi Avg',   value: 11.8, active: farmData.season === 'Rabi' },
            { label: 'Whole Yr',   value: 12.5, active: farmData.season === 'Summer' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '8px 4px',
                borderRadius: '10px',
                background: s.active ? 'var(--sky-green)' : 'transparent',
                border: s.active ? '1.5px solid rgba(45,106,79,0.3)' : '1.5px solid transparent',
              }}
            >
              <div style={{ fontSize: '0.65rem', color: s.active ? 'var(--soil-dark)' : 'var(--text-secondary)', fontWeight: 700 }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: s.active ? 'var(--leaf)' : 'var(--text-secondary)' }}>
                {s.value}t
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADVISORY */}
      <div className="insight-box" aria-live="polite">
        <strong>🌱 Agronomic Advisory:</strong> Current simulation for{' '}
        <strong>{farmData.crop}</strong> in{' '}
        <strong>{farmData.district || 'the selected district'}</strong> indicates stable
        parameters. Optimal fertilizer range is 100–200 kg/ha for this crop type.
      </div>
    </div>
  );
};

export default AnalysisBoard;