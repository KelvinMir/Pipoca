import React, { useState } from 'react';
import './css/App.css'
import MenuHamburguer from './Component/hamburguer'
import Footer from './Component/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Cadastro() {


const [formData, setFormData] = useState({
    email: '',
    ano: '',
  })
const [validate, setValidate] = useState({
  nome: '',
  sobrenome: '',
})


const [pass, setPass] = useState({
  password: '',
});
const [day, setDay] = useState ('')
const [month, setMonth] = useState ('')

const handlePass = (event) => {
  const newValue = event.target.value;
  if (newValue.length <= 20) {
    setPass({ password: newValue });
  }
};

  
  const handleChange = (event) => {
    const { name, value } = event.target;

    const cleanedText = value.replace(/[^A-Za-zÇçÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÀàÈèÌìÒòÙùÃãÕõÄäËëÏïÖöÜüÑñ\s]/g, '');

    setValidate({ ...validate, [name]: cleanedText });
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
  const handleDayChange = (event) => {
    const inputDay = event.target.value;
  
    const regexDay = /^(0?[1-9]|[12][0-9]|3[01])$/;
    
    if (regexDay.test(inputDay) || inputDay === '') {
      setDay(inputDay);
    }
    
  };
  const handleMonthChange = (event) => {
    const inputMonth = event.target.value;

    const regexMonth = /^(0?[1-9]|1[0-2])$/;
    if (regexMonth.test(inputMonth) || inputMonth === '') {
      setMonth(inputMonth);
    }
  }
  const handleYearChange = (event) => {
    const inputYear = event.target.value;
  
    const regexYear = /^(19\d\d|20\d\d|[2-9]\d{3})$/;
    if (regexYear.test(inputYear) || inputYear === '') {
      setFormData({ ...formData, ano: inputYear });
    }
  }


  const handleEnviarData = () => {
    const dataNascimento = `${day}/${month}/${formData.ano}`;
    return dataNascimento;
  }

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataNascimento = handleEnviarData();

   

    
    try {
      const dadosParaAPI = {

        "firstName": validate.nome,
        "lastName": validate.sobrenome,
        "email": formData.email,
        "password": pass,
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
                    value={validate.nome}
                    onChange={handleChange}
                    placeholder="&nbsp;Nome"
                    required
                    pattern="[a-zA-Z]+"
                  />
                  
                </div>
                <div>
                  <label htmlFor="sobrenome"></label>
                  <input
                    type="text"
                    id="sobrenome"
                    name="sobrenome"
                    value={validate.sobrenome}
                    onChange={handleChange}
                    placeholder="&nbsp;Sobrenome"
                    required
                    pattern="[a-zA-Z]+"
                  />
                  
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
                
              </div>
              <div className='data'>
                <div>
                  <label htmlFor="dia"></label>
                    <input
                      type="number"
                      id="dia"
                      name="dia"
                      value={day}
                      onChange={handleDayChange}
                      placeholder="&nbsp;Dia"
                      required
                      className='data-item'
                    />
                   
                </div>
                <div>  
                    <label htmlFor="mes"></label>
                    <input
                      type="number"
                      id="mes"
                      name="mes"
                      value={month}
                      onChange={handleMonthChange}
                      placeholder="&nbsp;Mês"
                      required
                      className='data-item'
                    />
                   
                </div>  
                <div >
                  <label htmlFor="ano"></label>
                    <input
                      type="number"
                      id="ano"
                      name="ano"
                      value={FormData.ano}
                      onChange={handleYearChange}
                      placeholder="&nbsp;Ano"
                      required
                      pattern="\d{4}"
                      className='data-item'
                    />
                  
                </div>
                
              </div>
              <div className='senha'>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={pass.password}
                    placeholder="&nbsp;Senha" 
                    required
                    onChange={handlePass}
                  />
                 
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
