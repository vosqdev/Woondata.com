import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ComingSoonPage } from './components/ComingSoonPage';
import './index.css';

// Dedicated public entry point for 'coming_soon' publication mode.
// By keeping this entry file strictly isolated, no internal pages,
// dashboards, Firebase credentials, or developer tools are included
// in the public JavaScript bundle.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComingSoonPage />
  </StrictMode>,
);
