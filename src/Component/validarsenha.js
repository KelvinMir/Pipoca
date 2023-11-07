import React, { useState } from 'react';
import '../css/validarsenha.css'
function SenhaValidation() {
  const [senha, setSenha] = useState('');

  return (
    <div className='senha'>
      <div>
        <input
          type="password"
          id="PASSWORD"
          name="PASSWORD"
          value={senha}
          placeholder="&nbsp;Senha" 
          required
          onChange={(e) => {
            setSenha(e.target.value);
            
          
          }}
        />
      </div>
      
      
    </div>
  );
}

export default SenhaValidation;
  
  