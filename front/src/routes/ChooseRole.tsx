import '../css/ChooseRole.css';
import { useNavigate } from "react-router-dom";
import admin from '../img/admin.jpg';
import guest from '../img/guest.jpg';

export default function ChooseRole(){
    const navigate = useNavigate();

  return (
    <div className="CR-container">
      <div className="CR">
        <h1>CryptoMonitor</h1>
        <h3>Elige tu rol</h3>

        <div className='buttons-container'>
            <div className='btn_container'>
                <button className="btn-img"
                onClick={() => {
                  localStorage.setItem('role', JSON.stringify('Admin'));
                  navigate("./Login");
                }}
                >
                <img src={admin} alt='admin'></img>
                </button>
                <h5>Admin</h5>
            </div>
            <div className='btn_container'>
                <button className="btn-img"
                onClick={() => {
                  localStorage.setItem('role', JSON.stringify('guest'));
                  navigate("./Login")
                }}
                >
                <img src={guest} alt='guest'></img>
                </button>
                <h5>Guest</h5>
            </div>
        </div>
      </div>
    </div>
  );
};
