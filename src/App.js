import React, { useState } from 'react';
import './css/App.css'
import MenuHamburguer from './Component/hamburguer'
import Footer from './Component/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cadastro() {

//Nome 
const [validate, setValidate] = useState({
  nome: '',
  sobrenome: '',
})
const handleName = (event) => {
  const { name, value } = event.target;
  const trimmedValue = value.trim();
  const isValidInput = /^[A-Za-z\s]+$/.test(trimmedValue);
  if (isValidInput || trimmedValue === '') {
    setValidate({
      ...validate,
      [name]: trimmedValue,
    });
  }
};
//Email
const [formData, setFormData] = useState({
    email: '',
  })
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
        } else {
          // Para outros campos, atualize o estado diretamente
          setFormData({
            ...formData,
            [name]: value,
          });
        }
};
const validateEmailFormat = (email) => {
  // Regex para validar formato de email básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`https://sua-api.com/check-email/${email}`);
    return response.data.emailExists;
  } catch (error) {
    console.error('Erro ao verificar se o e-mail existe:', error);
    return false;
  }
};

// Senha
const [pass, setPass] = useState({
  password: '',
});
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

const navigate = useNavigate();
  
const handleSubmit = async (event) => {
    event.preventDefault();
    const inputnome = document.getElementById('nome').value;
    const inputsobrenome = document.getElementById('sobrenome').value;
    const inputemail = document.getElementById('email').value;
    const selectdia = document.getElementById('dia').value;
    const selectmes = document.getElementById('mes').value;
    const selectano = document.getElementById('ano').value;
    const password = document.getElementById('password').value;
    const dataNascimento = handleEnviarData();
    const { email } = formData;

    if (inputnome === '' || inputsobrenome === '' || inputemail === ''|| selectdia ===''|| selectmes=== ''||
      selectano=== ''|| password === '') {
      toast.error("Por favor, preencha todos os campos!", {
          position: toast.POSITION.TOP_RIGHT,
        });
    } else {
        if (!isValidPassword(password)) {
          toast.error("A senha deve cumprir os requisitos!", {
            position: toast.POSITION.TOP_RIGHT,
          })
        } else {
          if (!validateEmailFormat(email)) {
              toast.error("Insira um email válido!", {
              position: toast.POSITION.TOP_RIGHT,
              })
          } 
          else {
                try {
                  const emailExists = await checkEmailExists(email);
                  if (emailExists) {
                    toast.error("Este email já está cadastrado!", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  } else {
                    const dadosParaAPI = {
                      "firstName": formData.nome,
                      "lastName": formData.sobrenome,
                      "email": formData.email,
                      "password": pass.password,
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
                  }
                } catch (error) {
                    console.error('Erro ao chamar a API:', error);
                    console.error('Erro da solicitação:', error.response);
                }
            }
        }
      }
    }

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
                    onChange={handleName}
                    placeholder="&nbsp;Nome"
                    
                  />
                  
                </div>
                <div>
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
              <div className='email'>
                <label htmlFor="email"></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="&nbsp;Email"
                />
                
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
              <div className='senha'>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={pass.password}
                    placeholder="&nbsp;Senha" 
                    onChange={handlePass}
                    
                  />
                 
                </div>
              </div>
             
              <div className='criterios'>
                <h3>Sua senha deve ter pelo menos:</h3>
                <p>Pelo menos uma letra maiúscula*</p>
                <p>Pelo menos uma letra minúscula*</p>
                <p>Pelo menos um número*</p>
                <p> Pelo menos um caractere especial* </p>
                <p>Entre 8 e 20 caracteres*</p>      
              </div>
              <button className='Cadastrar' type="submit">Cadastrar</button>
              <ToastContainer />
              <div className='login'>Já tem conta? <Link to="/telalogin">Fazer login</Link></div>

          </form>
          <Footer />
        </div>
        
      </div>
      
    </div>
     
  );
};

export default Cadastro;
