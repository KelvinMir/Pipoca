// src/components/MenuHamburguer.js
import React, { useState } from 'react';
import '../css/hamburguer.css'; 

function MenuHamburguer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='body-hamburguer'>
        <button className="menu-toggle" onClick={toggleMenu}>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
        </button> 
        <div className={`menu-hamburguer ${isOpen ? 'open' : ''}`}>
            <ul className="menu-items">
                <li><a href='/'>Home</a></li>
                <li><a href='/'>Galeria de fotos</a></li>
                <li><a href='/'>Trilha do Conhecimento</a></li>
                <li><a href='/'>Clube do Assinante</a></li>
                <li><a href='/'>Fale Conosco</a></li>
            </ul>
            <div className="overlay"></div>
        </div>
    </div>
  );
}

export default MenuHamburguer;
