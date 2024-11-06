import mapboxgl from 'mapbox-gl';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.scss';

const API_KEY = import.meta.env.VITE_MAP_BOX_TOKEN;

mapboxgl.accessToken = API_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
