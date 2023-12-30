import NavBar from "../components/navBar"
import "../css/Historial.css"
import {useEffect, useState} from "react"
import axiosInstance from "../services/axiosService";

export default function Billetera() {
  const [showError, setShowError] = useState(false);
  const [showHist, setShowHist] = useState();
  const token = JSON.parse(localStorage.getItem('token')!);
  const role = JSON.parse(localStorage.getItem('role')!);

  const data:any =[{"amount": 40, "currency": "ETHBTC"}, {"amount": -15, "currency": "ETHBTC"}, {"amount": 60, "currency": "ETHBTC"}, {"amount": -75, "currency": "ETHBTC"}]            ;


  useEffect(() =>{
    //historia
        axiosInstance
              .get("/wallet/history", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                if(res.data){
                  const hist:any = res.data.map((tran:any)=>{ 
                    console.log(tran);  
                    return <li className="tran">{tran.currency} : 
                    {(tran.amount > 0) && <div className="positive"> + {tran.amount}</div>}
                    {(tran.amount < 0) && <div className="negative">{tran.amount}</div>}
                    </li>
                });
                setShowHist(hist);
                }
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
      <div className="historial-container">
        <div>
            <div className="active-container">
                <h1 className="header">Historial de transacciones:</h1>
                 <h3 className="header">{showHist}</h3> 
            </div>
        </div>
        <div className="add-container">
            {showError && <div>
                                <div className="error">Error al mostrar el historial</div>
                            </div>}
        </div>
      </div>
    </div>
  );
}