import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import { StateProvider } from "./state";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>
);