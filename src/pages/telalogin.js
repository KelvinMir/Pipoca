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
  const [emailExists, setEmailExists] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'email') {
      setEmailExists(false);
    }
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

      if (formData.email) {
        try {

          const token = 'https://api-pipoca-agil-b6fe2e9f601d.herokuapp.com/api/v1/auth';
          const encodedToken = encodeURIComponent(token);
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${encodedToken}`
            },
          };

          const response = await axios.get(`https://api-pipoca-agil-b6fe2e9f601d.herokuapp.com/api/v1/users/email?email==${formData.email}`);
          if (response.data.exists) {
            setEmailExists(true);
            return;
          }
        console.log(response.data.exists)

        const LoginAPI = {
          email: formData.email,
          password: formData.password,
        };

        

        const LoginResponse = await axios.post('https://api-pipoca-agil-b6fe2e9f601d.herokuapp.com/api/v1/auth', LoginAPI, config);

        console.log('Resposta da API:', LoginResponse.data);
        navigate('/sucess');
        } catch (error) {
          if (error.response) {
            console.error('Erro na resposta da API:', error.response.data);
          } else {
            console.error('Erro na solicitação:', error.message);
          }
        }
      }
    }

  return (
    <div className='Login'>
      <MenuHamburguer />
      <div className='formulario'>
        <div className='control'>
          <form onSubmit={handleSubmit}>
            <h1 className='h1L'>Login</h1>
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
                {emailExists && <span className="erro">Este email já está cadastrado.</span>}
              </div>
              {formData.email && (
                <Senhaview
                  password={formData.password}
                  mostrarSenha={formData.mostrarSenha}
                  onChange={handlePasswordChange}
                  toggleMostrarSenha={toggleMostrarSenha}
                />
              )}
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