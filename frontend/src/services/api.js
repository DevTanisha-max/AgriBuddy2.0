// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
});

export const getSoilByLatLon = async (lat, lon) => {
  try {
    const res = await API.post('/get-soil-by-latlon', { lat, lon });
    return res.data; // { avg_rainfall_mm, soil_ph }
  } catch (err) {
    console.error('Error fetching soil data:', err);
    return { avg_rainfall_mm: 1000, soil_ph: 7.0 };
  }
};

export const getYieldPrediction = async (farmData) => {
  try {
    const payload = {
      crop: farmData.crop,
      season: farmData.season,
      state: farmData.state,
      lat: parseFloat(farmData.lat),
      lon: parseFloat(farmData.lon),
      fertilizer: parseFloat(farmData.fertilizer),
      pesticide: parseFloat(farmData.pesticide),
      // nitrogen, phosphorus, potassium, soil_ph are omitted – backend will fetch them
    };
    const res = await API.post('/predict', payload);
    return res.data;
  } catch (err) {
    console.error('Prediction API Error:', err.response?.data || err.message);
    throw err;
  }
};

export default API;