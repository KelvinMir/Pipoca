import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import Cadastro from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/telalogin';
import Sucess from './Component/sucess'


const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes> {/* Envolver todas as rotas em um componente Routes */}
      <Route path="/" element={<Cadastro />} />
      <Route path="/telalogin" element={<Login />} />
      <Route path="/sucess" element={<Sucess />} />
    </Routes>
  </Router>
);
