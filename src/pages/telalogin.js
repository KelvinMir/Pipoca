import React, { useState } from 'react';
import axios from 'axios';
import MenuHamburguer from '../Component/hamburguer';
import Footer from '../Component/footer';
import '../css/telalogin.css';
import { useNavigate } from 'react-router-dom';
import Senhaview from '../Component/senhaview';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [erros, setErros] = useState({
    email: '',
    senha: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (event) => {
    handleChange(event);
  };

  const toggleMostrarSenha = () => {
    setFormData({
      ...formData,
      mostrarSenha: !formData.mostrarSenha,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novosErros = {};

    if (!formData.email) {
      novosErros.email = 'Campo de email é obrigatório';
    }

    if (!formData.password) {
      novosErros.senha = 'Campo de senha é obrigatório';
    }

    if (Object.keys(novosErros).length > 0) {
      // Se houver erros, atualize o estado de erros
      setErros(novosErros);
    } else {
      try {
        const LoginAPI = {
          email: formData.email,
          password: formData.password,
        };

        const token = 'https://api-pipoca-agil-b6fe2e9f601d.herokuapp.com/api/v1/auth'; // Substitua pelo seu token real
        const encodedToken = encodeURIComponent(token);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${encodedToken}`
          },
        };

        const response = await axios.post('https://api-pipoca-agil-b6fe2e9f601d.herokuapp.com/api/v1/auth', LoginAPI, config);

        console.log('Resposta da API:', response.data);
        navigate('/sucess');
      } catch (error) {
        if (error.response) {
          console.error('Erro na resposta da API:', error.response.data);
        } else {
          console.error('Erro na solicitação:', error.message);
        }
      }
    }
  };

  return (
    <div className='Login'>
      <MenuHamburguer />
      <div className='formulario'>
        <div className='control'>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='logon'>
              <div className='user'>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder='Email'
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
                <span className="erro">{erros.email}</span>
              </div>
              <Senhaview
                password={formData.password}
                mostrarSenha={formData.mostrarSenha}
                onChange={handlePasswordChange}
                toggleMostrarSenha={toggleMostrarSenha}
                erros={erros}
              />
              <div className='Recuperar'><a href='/'>Recuperar senha?</a></div>
              <button className='Entrar' type="submit">Entrar</button>
            </div>
            <div className='alter'>
              <div className='line'></div>
              <div>Ou</div>
              <div className='line'></div>
            </div>
            <div className='LogSocial'>
              <button className='facebook' type="button">Continuar com Facebook</button>
              <button className='google' type="button">Continuar com Google</button>
              <button className='apple' type="button">Continuar com Apple</button>
            </div>
            <div className='cadastrar'>Não tem conta? <a href="/">Cadastre-se</a></div>
          </form>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;