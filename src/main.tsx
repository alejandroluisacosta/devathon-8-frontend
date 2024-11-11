import mapboxgl from 'mapbox-gl';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.scss';

if (!navigator.geolocation) {
  alert('Your browser does not support geolocation');

  //TODO: ask mentor if this is the right way to handle this
  throw new Error('Geolocation not supported');
}

export const API_KEY = import.meta.env.VITE_MAP_BOX_TOKEN;

mapboxgl.accessToken = API_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
