import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React } from './lib';
import './index.css';
import App from './App';
import ShareComponents from './ShareComponents'
import reportWebVitals from './reportWebVitals';

function Wrapper() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/components" element={<ShareComponents />} />
    </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById('reactRoot'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Wrapper />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
