import NavBar from "../components/navBar"
import "../css/Currencies.css"
import "../css/list.css"
import axiosInstance from "../services/axiosService";
import {useEffect, useState} from "react"

const INTERVAL_TIME = 5000;

export default function Currencies() {
    const token = JSON.parse(localStorage.getItem('token')!);
    const role = JSON.parse(localStorage.getItem('role')!);
    const [currencies, setCurrencies] = useState(['']);
    const [showButton, setShowButton] = useState(true);
    const [showcurrencies, setShowCurrencies] = useState();
    const [allCurrencies, setAllCurrencies] = useState();
    const [showInput, setshowInput] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [newCurrency, setNewCurrency] = useState("");
    const [operation, setOperation] = useState("");
    const [subs, setSubs] = useState(['']);
    const [showValues, setShowValues] = useState();
    const [gotMean, setGotMean] = useState("");
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());
    const [limit, setlimit] = useState();


    function subscribeToCurrency(){
      if(!currencies?.includes(newCurrency.toUpperCase())){
        setSaveError(true);
        return;
      }
      const send_data={currency:newCurrency.toLowerCase()}
      axiosInstance
            .post("/monitored-currencies/subscribe", send_data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if(res.data.sucess){  
                setshowInput(false);
                setSaveError(false);
                setShowButton(true);
                subs.push(newCurrency + " ");
                setNewCurrency("");
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });
    }

    function unsubscribeToCurrency(){
      if(!currencies?.includes(newCurrency.toUpperCase())){
        setSaveError(true);
        return;
      }
      const send_data={currency:newCurrency.toLowerCase()}
      axiosInstance
            .post("/monitored-currencies/unsubscribe", send_data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if(res.data.sucess){  
                setshowInput(false);
                setSaveError(false);
                setShowButton(true);
                const index = subs.indexOf(newCurrency + " ");
                if (index > -1) { 
                  subs.splice(index, 1);
                }
                setNewCurrency("");
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });
    }

    function getMean(){
      if(!currencies?.includes(newCurrency.toUpperCase()) || !initialDate || !finalDate){
        setSaveError(true);
        return;
      }
      const send_data={
        currency:newCurrency,
        initialDate: initialDate,
        finalDate:finalDate
      }
      axiosInstance
            .post("/monitored-currencies/mean", send_data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data.data);
              if(res.data.sucess){  
                setSaveError(false);
                setGotMean(res.data.data);
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });
    }

    function getState(){
      if(!currencies?.includes(newCurrency.toUpperCase())){
        setSaveError(true);
        return;
      }
      axiosInstance
            .get("/monitored-currencies/state/"+ newCurrency, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data.data);
              if(res.data.sucess){  
                setSaveError(false);
                setGotMean(res.data.data);
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });
    }

    function getOper(){
      if(!currencies?.includes(newCurrency.toUpperCase())){
        setSaveError(true);
        return;
      }
      axiosInstance
            .get("/monitored-currencies/operability/" + newCurrency, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data.data);
              if(res.data.sucess){  
                setSaveError(false);
                setGotMean(res.data.data);
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });
    }

    function setLimit(){
      if(!currencies?.includes(newCurrency.toUpperCase()) || !limit){
        setSaveError(true);
        return;
      }
      const send_data={
        currency:newCurrency,
        limit: limit
      }
      axiosInstance
            .post("/monitored-currencies/limit", send_data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data.data);
              if(res.data.sucess){  
                setshowInput(false);
                setShowButton(true);
                setNewCurrency("");
                setSaveError(false);
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });
    }
    
    function handleCurrencyChange(event:any){
        setNewCurrency(event.target.value);
    };
      function handleinitialChange(event:any){
        setInitialDate(event.target.value);
    };
      function handlefinalChange(event:any){
        setFinalDate(event.target.value);
    };
    function handleLimitChange(event:any){
      setlimit(event.target.value);
  };

    function cancel(){
        setshowInput(false);
        setSaveError(false);
        setShowButton(true);
        setOperation("");
        setInitialDate(new Date());
        setFinalDate(new Date());
        setGotMean(""); 
      }

    useEffect(() =>{

      const intervalfn = () => {

        //Currencies activos
        axiosInstance
                  .get("/monitored-currencies", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => {
                    if(res.data.sucess){
                      const curr = res.data.data.map((currency:any)=>{   
                        return <li className="currency">{currency}</li>;
                      });
                      setShowCurrencies(curr); 
                    }
                  })
                  .catch((error) => {
                    alert(error);
                  });
          //history            
                  axiosInstance
                  .get("/monitored-currencies/history", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    if(res.data.sucess){
                        
                        const curr:any = Object.keys(res.data.data).map((key:any)=>{  
                          console.log(res.data.data[key]);
                          return <div>{key}: {
                            res.data.data[key].map((val:any)=>{
                              return <li className="current_val"><span className="text">Valor: </span>{val.value} <span className="text">Fecha: </span>{val.date}</li>;
                            })
                          }</div>
                        });
                        setShowValues(curr); 
                    }
                  })
                  .catch((error) => {
                    alert(error);
                  });
              };
              const interval = setInterval(intervalfn, INTERVAL_TIME);
          
              return () => clearInterval(interval);
    
      }
      ,[token, showInput, showButton]);

      useEffect(() => {
        //Todos los currencies
        axiosInstance
                  .get("/currencies", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => {
                    if(res.data.success){
                        setCurrencies(res.data.data);
                        console.log(res.data.data);
                        const curr = res.data.data.map((currency:any)=>{  
                          return <li className="currency">{JSON.stringify(currency)}</li>;
                        });
                        setAllCurrencies(curr); 
                    }
                  })
                  .catch((error) => {
                    alert(error);
                  });
      },[]);

  return (   
    <div className="container"> 
      <NavBar></NavBar>
      <div className="currencies-container">
        <div>
            <div className="active-container">
                <h1 className="header">Valores:</h1>
                <h3 className="header">{showValues}</h3>
                {(role === 'Admin') && showButton && <button className="add_curr" onClick={() => {
                    setshowInput(true);
                    setShowButton(false)
                    setOperation('subs');
                    }}
                    >Suscribirse a currency</button>}
                {(role === 'Admin') && showButton && <button className="add_curr" onClick={() => {
                    setshowInput(true);
                    setShowButton(false)
                    setOperation('unsubs');
                    }}
                    >Desuscribirse de currency</button>}
                {showButton && <button className="add_curr" onClick={() => {
                    setshowInput(true);
                    setShowButton(false)
                    setOperation('mean');
                    }}
                    >Consultar promedio de currency</button>}
                {(role === 'Admin') && showButton && <button className="add_curr" onClick={() => {
                    setshowInput(true);
                    setShowButton(false)
                    setOperation('limit');
                    }}
                    >Setear limite operabilidad de currency</button>}
                {showButton && <button className="add_curr" onClick={() => {
                    setshowInput(true);
                    setShowButton(false)
                    setOperation('state');
                    }}
                    >Conseguir estado de mercado de currency</button>}
                {showButton && <button className="add_curr" onClick={() => {
                    setshowInput(true);
                    setShowButton(false)
                    setOperation('oper');
                    }}
                    >Checkear operabilidad de currency</button>}
            </div>
        </div>
        <div className="add-container">
            {showInput && <div>
                <input type="text" className="input input_curr" placeholder="Currency" onChange={handleCurrencyChange}></input>
                <div>
                {(operation === 'limit') && <input type="number" className="input" placeholder="limite" onChange={handleLimitChange}></input>}
                  {(operation === 'mean') && <div className="text"> Inicio<input  type="datetime-local" className="input input_val" onChange={handleinitialChange}></input></div>} 
                  {(operation === 'mean') && <div className="text"> Final<input  type="datetime-local" className="input input_val" onChange={handlefinalChange}></input></div>} 
                  {(operation === 'mean') && <button className="save" onClick={() => getMean()}>Consultar promedio</button>}
                  {(operation === 'oper') && <button className="save" onClick={() => getOper()}>Consultar operabilidad</button>}
                  {(operation === 'state') && <button className="save" onClick={() => getState()}>Consultar estado</button>}
                  {(operation === 'limit') && <button className="save" onClick={() => setLimit()}>setear limite</button>}
                  {(operation === 'mean' || operation === 'state' || operation === 'oper') && <input readOnly={true} type="text" className="input input_val" value={gotMean}></input>} 
                    <button className="cancel" onClick={() => cancel()}>Cancelar</button>
                    {(operation === "subs") && <button className="save" onClick={() => subscribeToCurrency()}>Guardar subscripción</button>}
                    {(operation === "unsubs") && <button className="save" onClick={() => unsubscribeToCurrency()}>Guardar desubscripción</button>}
                </div>
            </div>}
            {saveError && <div>
                                <div className="error">Error al guardar</div>
                            </div>}
        </div>
      </div>
    </div>
  );
}