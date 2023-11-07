import React from 'react';
import '../css/telalogin.css'
import '../pages/telalogin'
function Senhaview(props) {
  const { password, mostrarSenha, onChange, toggleMostrarSenha, erros} = props;
  if (!password) {
    erros.senha = 'Campo de senha é obrigatório';
  }
  
  return (
        <div className="password">
          <input
            type={mostrarSenha ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder='Senha'
            value={password}
            required
            onChange={onChange}
          />
          <span className="erro">{erros.senha}</span>
          <button
            type="button"
            className="toggle-button"
            onClick={toggleMostrarSenha}
            
          >
            
            <i className={mostrarSenha ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
          </button>
        </div>
  );
}
      
export default Senhaview;
