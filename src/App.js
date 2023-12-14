import React, { useState } from 'react';
import './css/App.css'
import MenuHamburguer from './Component/hamburguer'
import Footer from './Component/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Cadastro() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

//Nome 
const [validate, setValidate] = useState({
  nome: '',
  sobrenome: '',
})
const [isNomeValid, setIsNomeValid] = useState(true);
const [isSobrenomeValid, setIsSobrenomeValid] = useState(true);

const handleName = (event) => {
  const { name, value } = event.target;
  const trimmedValue = value.trim();
  const isValidInput = /^[A-Za-z\s]+$/.test(trimmedValue);
    setValidate({
      ...validate,
      [name]: trimmedValue,
    });
    if (name === 'nome') {
      setIsNomeValid(isValidInput);
    } else if (name === 'sobrenome') {
      setIsSobrenomeValid(isValidInput);
    }
  
};

//EMAIL
const [formData, setFormData] = useState({
    email: '',
  })
const [isEmailValid, setIsEmailValid] = useState(true);
const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

const handleChange = (event) => {
    const { name, value } = event.target;
    const cleanedText = value.replace(/[^A-Za-zÇçÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÀàÈèÌìÒòÙùÃãÕõÄäËëÏïÖöÜüÑñ\s]/g, '');
    
    setFormData({ ...formData, [name]: cleanedText });
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
        [name]: cleanedText,
      });
    }
};
const validateEmailFormat = (email) => {
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const FecharPag = () => {
  setEmailAlreadyExists(false);
}

// Senha
const [pass, setPass] = useState({
  password: '',
});
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
const handlePass = (event) => {
  const newValue = event.target.value;
  if (newValue.length <= 20) {
    setPass({ password: newValue });
    setIsPasswordValid(isValidPassword(newValue));
  }
};



//Data
const [day, setDay] = useState ('')
const [month, setMonth] = useState ('')
const [ano, setAno] = useState('');
const diaInicio = 1;
const diaFim = 31;
const dias = [];
  for (let dia = diaInicio; dia <= diaFim; dia++) {
      dias.push(dia);
  }

const mesInicio = 1;
const mesFim = 12;
const mes = [];
  for (let meses = mesInicio; meses <= mesFim; meses++) {
      mes.push(meses);
  }

const anoInicio = 1930;
const anoFim = 2018;
const anos = [];
  for (let ano = anoInicio; ano <= anoFim; ano++) {
      anos.push(ano);
  }

const handleEnviarData = () => {
  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedYear = ano.toString();

  const dataNascimento = `${formattedDay}/${formattedMonth}/${formattedYear}`;
  return dataNascimento;
}
const handleSubmit = async (event) => {
  event.preventDefault();
  if (isSubmitting) {
    return;
  }

  setIsSubmitting(true);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json', 
      }
    }
    
      const dadosParaAPI = {
        "firstName": validate.nome,
        "lastName": validate.sobrenome,
        "email": formData.email,
        "password": pass.password,
        "birthday": handleEnviarData(),
      };
      const requestBody = JSON.stringify(dadosParaAPI);   
      const response = await axios.post('https://api-pipoca-agil-b6fe2e9f601d.herokuapp.com/api/v1/users', requestBody, config);
      console.log('Envio concluido', response.data);
      navigate('/sucess');
      
  } catch (error) {
      console.error('Erro da solicitação:', error.response);
      if (error.response && error.response.status === 400 && error.response.data.message.includes('E-mail already registered')) {
        // Se o email já existe, atualize o estado
        setEmailAlreadyExists(true);
        
      }
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <div className='container'>
      <MenuHamburguer />
      <div className='formularioC'>
        <div className='controlC'>
          <form className='formC' onSubmit={handleSubmit}>
              <h1 className='h1C'>Criar Conta</h1>
              <div className='nome-sobr'>
                <div className={`nome ${isNomeValid ? '' : 'nome-invalido'}`}>
                  <label htmlFor="nome"></label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={validate.nome}
                    onChange={handleName}
                    placeholder="&nbsp;Nome"
                    
                  />
                  
                </div>
                <div className={`sobrenome ${isSobrenomeValid ? '' : 'sobrenome-invalido'}`}>
                  <label htmlFor="sobrenome"></label>
                  <input
                    type="text"
                    id="sobrenome"
                    name="sobrenome"
                    value={validate.sobrenome}
                    onChange={handleName}
                    placeholder="&nbsp;Sobrenome"
                  />
                  
                </div>    
              </div >
              <div className={`email ${isEmailValid ? '' : 'email-invalido'} ${emailAlreadyExists ? 'email-ja-cadastrado' : ''}`}>
                <label htmlFor="email"></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="&nbsp;Email"
                />
                 {emailAlreadyExists && (
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
                
              </div>
              <div className='data'>
                  <div>
                    <label htmlFor="dia"></label>
                    <select
                        id='dia'
                        className="data-item"
                        value={day}
                        onChange={(e) => setDay(parseInt(e.target.value))}
                      >
                        <option value="" disabled>Dia</option>
                        {dias.map((dia) => (
                          <option  key={dia} value={dia}>
                            {dia}
                          </option>
                        ))}
                      </select>
                                
                  </div>
                  <div>  
                      <label htmlFor="mes"></label>
                      <select
                        id='mes'
                        className="data-item"
                        value={month}
                        onChange={(e) => setMonth(parseInt(e.target.value))}
                      >
                        <option value="" disabled>Mês</option>
                        {mes.map((meses) => (
                          <option key={meses} value={meses}>
                            {meses}
                          </option>
                        ))}
                      </select>
                                
                  </div>  
                  <div >
                    <label htmlFor="ano"></label>
                    <select
                      id='ano'
                      className="data-item"
                      value={ano}
                      onChange={(e) => setAno(parseInt(e.target.value))}
                    >
                      <option value="" disabled style={{fontFamily:'Montserrat', fontWeight:400, color:'black'}}>Ano</option>
                      {anos.map((ano) => (
                        <option key={ano} value={ano}>
                          {ano}
                        </option>
                      ))}
                    </select>
                    
                  </div>
                  
              </div>
              <div className={`senha ${isPasswordValid ? '' : 'senha-invalida'}`}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={pass.password}
                    placeholder="&nbsp;Senha" 
                    onChange={handlePass}
                    
                  />

              </div>
             
              <div className='criterios'>
                <h3>Sua senha deve ter pelo menos:</h3>
                <p>Pelo menos uma letra maiúscula*</p>
                <p>Pelo menos uma letra minúscula*</p>
                <p>Pelo menos um número*</p>
                <p> Pelo menos um caractere especial* </p>
                <p>Entre 8 e 20 caracteres*</p>      
              </div>
              <button className='Cadastrar' type="submit" disabled={!isNomeValid || !isSobrenomeValid || !isEmailValid || !isPasswordValid}>Cadastrar</button>
              <div className='login'>Já tem conta? <Link to="/telalogin">Fazer login</Link></div>

          </form>
          <Footer />
          
        </div>
        
      </div>
      
      
    </div>
     
  );
};

export default Cadastro;
