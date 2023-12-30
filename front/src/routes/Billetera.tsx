import NavBar from "../components/navBar"
import "../css/Billetera.css"
import {useEffect, useState} from "react"
import axiosInstance from "../services/axiosService";

export default function Billetera() {
  const [showError, setShowError] = useState(false);
  const [showWallet, setShowWallet] = useState();
  const token = JSON.parse(localStorage.getItem('token')!);
  const role = JSON.parse(localStorage.getItem('role')!);


  useEffect(() =>{
    //Currencies activos
        axiosInstance
              .get("/wallet", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                const curr:any = res.data.map((obj:any)=>{   
                  return <div className="wallet-currency">{obj.currency} : <div className="amount">{obj.amount}</div></div>
                });
              setShowWallet(curr);
              })
              .catch((error) => {
                alert(error);
              });

    // //Todos los currencies
    //     axios
    //           .get("http://localhost:3001/currencies", {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //             },
    //           })
    //           .then((res) => {
    //             if(res.data.success){
    //                 setCurrencies(res.data.data);
    //                 console.log(res.data.data);
    //                 const curr = res.data.data.map((currency:any)=>{  
    //                   return <li className="currency">{JSON.stringify(currency)}</li>;
    //                 });
    //                 setAllCurrencies(curr); 
    //             }
    //           })
    //           .catch((error) => {
    //             alert(error);
    //           });
    
      }
      ,[]);

  return (   
    <div className="container"> 
      <NavBar></NavBar>
      <div className="billetera-container">
            <div className="active-container">
                <h1 className="header">Billetera:</h1>
                 <h3 className="header">{showWallet}</h3> 
            </div>
        <div className="add-container">
            {showError && <div>
                                <div className="error">Error al mostrar la billetera</div>
                            </div>}
        </div>
      </div>
    </div>
  );
}