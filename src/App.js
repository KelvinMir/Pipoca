import React, { useState } from 'react';
import './css/App.css'
import MenuHamburguer from './Component/hamburguer'
import Footer from './Component/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Cadastro() {


 const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    dia: '',
    mes: '',
    ano: '',
    password: '',
  });

  const [erros, setErros] = useState({
    nome:'',
    sobrenome: '',
    dia:'',
    mes:'',
    ano:'',
    email: '',
    password: '',

  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      const lowercaseEmail = value.toLowerCase();
      setFormData({
        ...formData,
        [name]: lowercaseEmail,
      });
    } else {
      // Para outros campos, atualize o estado diretamente
      setFormData({
        ...formData,
        [name]: value,
      });
   }
  };

  const handleEnviarData = () => {
    const dataNascimento = `${formData.dia}/${formData.mes}/${formData.ano}`;
    return dataNascimento;
  }

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataNascimento = handleEnviarData();

    const novosErros = {};

    if (!formData.nome) {
      novosErros.nome = 'Campo de nome é obrigatório';
    }

    if (!formData.sobrenome) {
      novosErros.sobrenome = 'Campo de sobrenome é obrigatório';
    }
    if (!formData.email) {
      novosErros.email = 'Campo de email é obrigatório';
    }
    if (!formData.dia) {
      novosErros.dia = 'Campo de dia é obrigatório';
    }
    if (!formData.mes) {
      novosErros.mes = 'Campo de mês é obrigatório';
    }
    if (!formData.ano) {
      novosErros.ano = 'Campo de ano é obrigatório';
    }
    if (!formData.password) {
      novosErros.password = 'Campo de senha é obrigatório';
    }


    if (Object.keys(novosErros).length > 0) {
      // Se houver erros, atualize o estado de erros
      setErros(novosErros);
    }
  
    try {
      const dadosParaAPI = {

        "firstName": formData.nome,
        "lastName": formData.sobrenome,
        "email": formData.email,
        "password": formData.password,
        "birthday": dataNascimento,
      };

     

    const config = {
      headers: {
        'Content-Type': 'application/json',
        
      }
    };


      const response = await axios.post('https://api-pipoca-agil-b6fe2e9f601d.herokuapp.com/api/v1/users', dadosParaAPI, config);
    
      console.log('Envio concluido', response.data);
      navigate('/sucess');

    } catch (error) {
        console.error('Erro ao chamar a API:', error);
        console.error('Erro da solicitação:', error.response);
      
    }
  };
  
  return (
    <div className='container'>
      <MenuHamburguer />
      <div className='formulario'>
        <div className='control'>
          <form className='form' onSubmit={handleSubmit}>
              <h1 className='h1C'>Criar Conta</h1>
              <div className='nome-sobr'>
                <div>
                  <label htmlFor="nome"></label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="&nbsp;Nome"
                    required
                  />
                    <span className="erro">{erros.nome}</span>
                </div>
                <div>
                  <label htmlFor="sobrenome"></label>
                  <input
                    type="text"
                    id="sobrenome"
                    name="sobrenome"
                    value={formData.sobrenome}
                    onChange={handleChange}
                    placeholder="&nbsp;Sobrenome"
                    required
                  />
                  <span className="erro">{erros.sobrenome}</span>
                </div>    
              </div >
              <div className='email'>
                <label htmlFor="email"></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required pattern="[a-zA-Z0-9._+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}"
                  placeholder="&nbsp;Email"
                />
                <span className="erro">{erros.email}</span>
              </div>
              <div className='data'>
                <div>
                  <label htmlFor="dia"></label>
                    <input
                      type="text"
                      id="dia"
                      name="dia"
                      value={formData.dia}
                      onChange={handleChange}
                      placeholder="&nbsp;Dia"
                      required
                      pattern="\d{2}"
                      className='data-item'
                    />
                    <span className="erro">{erros.dia}</span>
                </div>
                <div>  
                    <label htmlFor="mes"></label>
                    <input
                      type="text"
                      id="mes"
                      name="mes"
                      value={formData.mes}
                      onChange={handleChange}
                      placeholder="&nbsp;Mês"
                      required
                      pattern="\d{2}"
                      className='data-item'
                    />
                    <span className="erro">{erros.mes}</span>
                </div>  
                <div >
                  <label htmlFor="ano"></label>
                    <input
                      type="text"
                      id="ano"
                      name="ano"
                      value={formData.ano}
                      onChange={handleChange}
                      placeholder="&nbsp;Ano"
                      required
                      pattern="\d{4}"
                      className='data-item'
                    />
                    <span className="erro">{erros.ano}</span> 
                </div>
                
              </div>
              <div className='senha'>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="&nbsp;Senha" 
                    required
                    onChange={handleChange}
                  />
                  <span className="erro">{erros.senha}</span>
                </div>
              </div>
             
              <div className='criterios'>
                <h3>Sua senha deve ter pelo menos:</h3>
                <p>Pelo menos uma letra maiúscula*</p>
                <p>Pelo menos uma letra minúscula*</p>
                <p>Pelo menos um número*</p>
                <p>Pelo menos um caractere especial*</p>
                <p>Entre 8 e 20 caracteres*</p>       
              </div>
              <button className='Cadastrar' type="submit">Cadastrar</button>
              <div className='login'>Já tem conta? <Link to="/telalogin">Fazer login</Link></div>

          </form>
          <Footer />
        </div>
        
      </div>
      
    </div>
     
  );
};

export default Cadastro;
