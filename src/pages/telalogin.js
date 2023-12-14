import React, { useState } from 'react';
import axios from 'axios';
import MenuHamburguer from '../Component/hamburguer';
import Footer from '../Component/footer';
import '../css/telalogin.css';
import { useNavigate } from 'react-router-dom';
import Senhaview from '../Component/senhaview';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [emailLogExists, setEmailLogExists] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    const cleanedTextLog = value.replace(/[^A-Za-zÇçÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÀàÈèÌìÒòÙùÃãÕõÄäËëÏïÖöÜüÑñ\s]/g, '');
    setFormData({ ...formData, [name]: cleanedTextLog });
    if (name === 'email') {
      const lowercaseEmail = value.toLowerCase();
      setFormData({
        ...formData,
        [name]: lowercaseEmail,
      });
      setIsEmailValid(validateEmailFormat(lowercaseEmail));
    } else {
      setFormData({
        ...formData,
        [name]: cleanedTextLog,
      });
    }
    
  };
  const validateEmailFormat = (email) => {
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  function isValidPassword(password) {
    const regexMaiuscula = /[A-Z]/;
    const regexMinuscula = /[a-z]/;
    const regexNumero = /[0-9]/;
    const regexCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    const condicaoComprimento = password.length >= 8 && password.length <= 20;
  
    return (
      regexMaiuscula.test(password) &&
      regexMinuscula.test(password) &&
      regexNumero.test(password) &&
      regexCaractereEspecial.test(password) &&
      condicaoComprimento
    );
  }
  const handlePasswordChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length <= 20) {
      setFormData({ password: newValue });
      setIsPasswordValid(isValidPassword(newValue));
    }
  };



  const toggleMostrarSenha = () => {
    setFormData({
      ...formData,
      mostrarSenha: !formData.mostrarSenha,
    });
  };
  const FecharPag = () => {
    setEmailLogExists(false);
  };
  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {

          const token = 'https://api-pipoca-agil-b6fe2e9f601d.herokuapp.com/api/v1/auth';
          const encodedToken = encodeURIComponent(token);
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${encodedToken}`
            },
          };
        const LoginAPI = {
          "email": formData.email,
          "password": formData.password,
        };
        const LoginResponse = await axios.post('https://api-pipoca-agil-b6fe2e9f601d.herokuapp.com/api/v1/auth', LoginAPI, config);
        console.log('Resposta da API:', LoginResponse.data);
        navigate('/sucess');
      } catch (error) {
          console.error('Erro da solicitação:', error.response);
          if (error.response.data.message.includes('E-mail not registered')) {
        
            console.error('E-mail não cadastrado.');
      }
    }
  }
  return (
    <div className='Login'>
      <MenuHamburguer />
      <div className='formularioLog'>
        <div className='control'>
          <form className='formlog' onSubmit={handleSubmit}>
            <h1 className='h1L'>Login</h1>
            <div className='logon'>
              <div className={`user ${isEmailValid ? '' : 'user-invalido'} ${emailLogExists ? 'email-ja-cadastrado' : ''}`}>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder='Email'
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <Senhaview
                  password={formData.password}
                  mostrarSenha={formData.mostrarSenha}
                  onChange={handlePasswordChange}
                  toggleMostrarSenha={toggleMostrarSenha}
                  isEmailValid={isEmailValid}
                  emailLogExists={emailLogExists}
                  isPasswordValid={isPasswordValid}
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
            <div className='cadastrar'>Não tem conta? <a href="/"> Cadastre-se</a></div>
            {emailLogExists && (
                    <div className="overlayEmail">
                      <div className='background'>
                        <h1 className='Title'>Email já cadastrado!</h1>
                        <div className='buttons'>
                          <button className='EmailExist'><Link to="/telalogin" className='EmailExist'> Faça login</Link></button>   
                          <div>Ou</div>   
                          <button className='EmailExist' onClick={FecharPag}>Use outro email</button>  
                        </div>
                      </div>
                    </div>
            )}
                
          </form>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;