import NavBar from "../components/navBar"
import "../css/Variable.css"
import "../css/list.css"
import axiosInstance from "../services/axiosService";
import {useEffect, useState} from "react"

export default function Variable() {
    const token = JSON.parse(localStorage.getItem('token')!);
    const role = JSON.parse(localStorage.getItem('role')!);
    const [showButton, setShowButton] = useState(true);
    const [showValues, setShowValues] = useState();
    const [showInput, setshowInput] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [newValue, setNewValue] = useState("");
    const [newName, setNewName] = useState("");
    const [operation, setOperation] = useState("");
    const [gotValue, setGotValue] = useState("");
    const [editInput, setEditInput] = useState(false);
    const [toggleRefresh, setToggleRefresh] = useState(false);

    function saveValue(){
      const send_data={variable:newName, value:newValue}
      console.log(token);
      axiosInstance
            .post("/variables", send_data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if(res.status === 200){  
                setshowInput(false);
                setSaveError(false);
                setShowButton(true);
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });

    }

    function getValue(){
      axiosInstance
            .get("/variables/" + newName ,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if(res.status === 200){  
                setSaveError(false);
                
                setGotValue(res.data);
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });
  }
    


    function handleNameChange(event:any){
        setNewName(event.target.value);
    };
    function handleValueChange(event:any){
      setNewValue(event.target.value);
  };

    function cancel(){
        setshowInput(false);
        setSaveError(false);
        setShowButton(true);
        setOperation('');
        setNewValue('');
        setGotValue('');
      }

    function editValue(){
      const send_data={variable:newName, value:newValue}
      axiosInstance
            .put("/variables", send_data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if(res.status === 200){  
                setshowInput(false);
                setSaveError(false);
                setEditInput(false);
                setShowButton(true);
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });
    }

    function deleteVal(val:string){
      axiosInstance
            .delete("/variables/" + val, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if(res.status === 200){  
                setToggleRefresh(!toggleRefresh);
              }else{
                setSaveError(true);
              }
            })
            .catch((e) => {
              console.log("Error reporting: ", e);
              setSaveError(true);
            });
    }

    useEffect(() =>{
      console.log(token);
    //Valores activos
        axiosInstance
              .get("/variables", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                console.log(res);
                if(res.data){
                   const curr:any = Object.keys(res.data).map((val:any)=>{   
                     return <div className="value">{val} : <div className="amount-val">{res.data[val]}</div>
                     <button className="edit-val" onClick={() => {setOperation('edit'); setNewName(val); setEditInput(true)}}>editar</button>
                     <button className="delete-val" onClick={() => deleteVal(val)} >borrar</button>
                     </div>;
                   });
                  setShowValues(curr); 
                }
              })
              .catch((error) => {
                alert(error);
              });
    
      }
      ,[token, showInput, editInput, toggleRefresh]);

  return (   
    <div className="container"> 
      <NavBar></NavBar>
      <div className="valores-container">
        <div>
            <div className="active-container">
                <h1 className="header">Variables:</h1>
                <h3 className="header">{showValues}</h3>
                <div className="btn-container">
                  {(role === 'Admin') && showButton && <button className="add_val" onClick={() => {
                      setshowInput(true);
                      setShowButton(false);
                      setOperation('add');
                      }}
                      >Agregar Variable</button>}
                  {(role === 'Admin') && showButton && <button className="add_val" onClick={() => {
                      setshowInput(true);
                      setShowButton(false);
                      setOperation('get');
                      }}
                      >Consultar Variable</button>}
                </div>
            </div>
        </div>
        <div className="add-container">
            {showInput && <div>
                <input type="text" className="input input_name" placeholder="Nombre de variable" onChange={handleNameChange}></input>
                {(operation === 'add') && <input type="text" className="input input_val" placeholder="Valor" onChange={handleValueChange}></input>}
                {(operation === 'add') && <button className="save" onClick={() => saveValue()}>Guardar variable</button>}
                {(operation === 'get') && <input readOnly={true} type="text" className="input input_val" onChange={handleValueChange} value={gotValue}></input>} 
                {(operation === 'get') && <button className="save" onClick={() => getValue()}>Consultar variable</button>}
                <button className="cancel" onClick={() => cancel()}>Cancelar</button>
            </div>}
            {(operation === 'edit' && editInput) && <input type="text" className="input input_val" onChange={handleValueChange}></input>} 
            {(operation === 'edit' && editInput) && <button className="save" onClick={() => editValue()}>Editar variable</button>}
            {saveError && <div>
                                <div className="error">Error al guardar variable</div>
                            </div>}
        </div>
      </div>
    </div>
  );
}