import React, { useState } from 'react';
import fiuba from './img/240px-Logo-fiuba_big.png';
import './css/App.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import axiosInstance from './services/axiosService';


function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  function onGoogleLoginSuccess(credentialResponse: any){
    console.log(credentialResponse);
    navigate("/Billetera", { replace: true });
  }
  function onGoogleLoginError(){
    console.log('Login Failed');
  }

  const onClickButton = async () => {
    const { data } = await axiosInstance.get("/admin");
    setEmail(data.email);
  }
  return (
    <>
        <div className="App">
            <header className="App-header">
            <img src={fiuba} alt="fiuba" />
              <h1>Cryptomonitor</h1>
                <div>
                  <div>
                      <input className="input" type="text" placeholder='Username'></input>
                  </div>
                  <div>
                      <input className="input" type="password" placeholder='Password'></input>
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

export default App;
