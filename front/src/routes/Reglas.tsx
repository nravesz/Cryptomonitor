import NavBar from "../components/navBar"
import "../css/Reglas.css"
import {useEffect, useState} from "react"
import axiosInstance from "../services/axiosService";
import React from "react";
import ReactDOM from "react-dom";


const Reglas = ()=> {
  var simple_json = require("../rules/simple.json");
  const [rules, setRules] = useState([]);
  const [showRules, setShowRules] = useState();
  const [saveError, setSaveError] = useState(false);
  const [content, setContent] = useState(JSON.stringify(simple_json,null,2));
  const [showeditor, setshoweditor] = useState(false);
  const [editorContent, seteditorContent] = useState(JSON.parse(content));
  const token = JSON.parse(localStorage.getItem('token')!);
  const role = JSON.parse(localStorage.getItem('role')!);
  
  function saveRule(){
    var send_rules:any =[editorContent]
    if(editorContent.rules){
      send_rules =editorContent.rules 
    }
    console.log(send_rules);
    const send_data={rules: send_rules}
    axiosInstance
        .post("/rules", send_data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          setshoweditor(false);
          setSaveError(false);
        })
        .catch((e) => {
          console.log("Error reporting: ", e);
          setSaveError(true);
        });
  }

  function cancel(){
    setshoweditor(false);
    setSaveError(false);
    setContent(JSON.stringify(simple_json,null,2));
  }

  function editRule(rule:any){
    console.log(rule);
    setContent(JSON.stringify(rule,null,2));
    seteditorContent(rule);
    setshoweditor(true);
  }

  function handleCodeChange(event:any){
    console.log(event.target.value)
    seteditorContent(JSON.parse(event.target.value));
  };

  useEffect(() =>{
    
    axiosInstance
          .get("/rules", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if(res.data.rules){
              setRules(res.data.rules);
              const rules = res.data.rules.map((rule:any)=>{   
                return <li className="rule">{rule.name} {!showeditor && <button className="edit" onClick={() => editRule(rule)}>{(role==='Admin') && 'editar'}{(role==='guest') && 'ver'}</button>}</li>;
              });
              setShowRules(rules); 
            }
          })
          .catch((error) => {
            alert(error);
          });

  }
  ,[token, showeditor]);

  return (   
    <div className="container"> 
      <NavBar></NavBar>
      <div className="reglas-container">
        <div className="active-container">
          <h1 className="header">Reglas activas:</h1>
          <h3 className="header">{showRules}</h3>
          {(role === 'Admin') && !showeditor && <button className="add_rule" onClick={() => {
              setshoweditor(true);
              seteditorContent(JSON.stringify(simple_json,null,2));
            }}
            >Agregar nueva regla</button>}
        </div>
        <div className="editor-container">
        {(role==='Admin') && showeditor && <textarea className="content" onChange={handleCodeChange} defaultValue={content} ></textarea>}
        {(role==='guest') && showeditor && <textarea readOnly={true} className="content" onChange={handleCodeChange} defaultValue={content} ></textarea>}
          <div>
            {showeditor && <button className="cancel" onClick={() => cancel()}>Cancelar</button>}
            {(role==='Admin') &&  showeditor && <button className="save" onClick={() => saveRule()}>Guardar</button>}
          </div>
          {saveError && <div>
                            <div className="error">Error al guardar regla. Verifique el formato de la regla</div>
                        </div>}
        </div>
      </div>
    </div>
  );
}

export default Reglas;