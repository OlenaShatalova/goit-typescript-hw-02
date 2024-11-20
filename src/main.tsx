import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import 'modern-normalize';
import './index.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
