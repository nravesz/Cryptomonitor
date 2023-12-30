import {useContext, useState} from 'react';
import fiuba from '../img/240px-Logo-fiuba_big.png';
import '../css/Login.css';
import { GoogleLogin } from '@react-oauth/google';
import {useNavigate} from "react-router-dom";
import axiosInstance from "../services/axiosService";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [created, setCreated] = useState(false);
  const role = JSON.parse(localStorage.getItem('role')!);

  function onGoogleLoginSuccess(credentialResponse: any){
    console.log(credentialResponse.credential);
    localStorage.setItem('token', JSON.stringify(credentialResponse.credential));

    const logindata = {
      token: credentialResponse.credential,
      rol: role,
    };
    axiosInstance
    .post("/auth/auth-google", logindata)
    .then((res) => {
      if(res.data.success){
        setIncorrect(false);
        localStorage.setItem('token', JSON.stringify(res.data.token));
        navigate("/Billetera");
      }else{
        setIncorrect(true);
        setIncomplete(false);
     }
  }
  )
    .catch((e) => {
      alert("Error logging in: " + e);
      setIncorrect(true);
      setIncomplete(false);
      });
  }
  function onGoogleLoginError(){
    alert('Login failed');
  }

  function handleEmailChange(event:any){
    setEmail(event.target.value);
  };
  function handlePasswordChange(event:any){
    setPassword(event.target.value);
  };

function login() {
        const logindata = {
          email: email,
          password: password,
        };
        axiosInstance
        .post("/auth/login", logindata)
        .then((res) => {
          if(res.data.success){
            setIncorrect(false);
            localStorage.setItem('token', JSON.stringify(res.data.token));
            navigate("/Billetera");
          }else{
            setIncorrect(true);
            setIncomplete(false);
         }
      }
      )
        .catch((e) => {
          alert("Error logging in: " + e);
          setIncorrect(true);
          setIncomplete(false);
          });
 }

 function signin() {

  const data = {
    email: email,
    password: password,
    rol:role,
  };
  console.log(role);
  axiosInstance
  .post("http://localhost:3001/auth/sign-up", data)
  .then((res) => {
    if(res.data.success){
      setIncomplete(false);
            setIncorrect(false);
      setCreated(true);
      localStorage.setItem('token', JSON.stringify(res.data.token));
    }else{
      setIncomplete(true);
      setIncorrect(false);
          }
  })
  .catch((e) => {
    alert("Error signing up: " + e);
    setIncomplete(true);
    setIncorrect(false);
        });
 }

  return (
    <>
        <div className="Login">
            <header className="Login-header">
            <img src={fiuba} alt="fiuba" />
              <h1>CryptoMonitor</h1>
                <div>
                  {incorrect && <div>
                      <div className="error">Mail o Contraseña incorrectos</div>
                  </div>}
                  {incomplete && <div>
                      <div className="error">Ingrese mail y contraseña o ya existe un admin</div>
                  </div>}
                  {created && <div>
                      <div className="created">Cuenta creada</div>
                  </div>}
                  <div>
                      <input className="input" type="text" placeholder='email' onChange={handleEmailChange}></input>
                  </div>
                  <div>
                      <input className="input" type="password" placeholder='Password' onChange={handlePasswordChange}></input>
                  </div>
                  <div>
                      <button className="login" onClick={login}>Login</button>
                  </div>
                  <div>
                      <button className="signin" onClick={signin}>Sign in</button>
                  </div>
                </div>
                <div className='googleLoginDiv'>
                  <GoogleLogin
                      onSuccess={credentialResponse => {
                          onGoogleLoginSuccess(credentialResponse);
                      }}
                      onError={() => {
                          onGoogleLoginError();
                      }}
                  />
                </div>
            </header>
        </div>
      </>
  );
}

export default Login;
