import '../css/navBar.css';
import { useNavigate} from "react-router-dom";

export default function NavBar(){
    const navigate = useNavigate();
  
    return (    
        <>
        <div className="navbar-container">
            <div className="navbar">
            <h1 className="navbar-header">Crypto</h1>
                <div className="link-container">
                <div>
                    <button 
                    onClick={() => 
                        navigate("/Billetera")}
                    className="link">Billetera</button>
                </div>
                <div>
                    <button 
                    onClick={() => 
                        navigate("/Historial")}
                    className="link">Historial de Transacciones</button>
                </div>  
                <div>
                    <button  
                    onClick={() => 
                        navigate("/Reglas")}
                    className="link">Reglas y Acciones</button>
                </div>   
                <div>
                    <button  
                    onClick={() => 
                        navigate("/Variable")}
                    className="link">Variables</button>
                </div>  
                <div>
                    <button  
                    onClick={() => 
                        navigate("/Currencies")}
                    className="link">Currencies</button>
                </div>  
                </div>
            </div>
        </div>
    </>
    );
}