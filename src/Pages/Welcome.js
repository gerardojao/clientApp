import React from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie/es6';


const Welcome = () => {

  const cookies = new Cookies();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    
    cookies.remove('firstName', { path: "/login" })

    navigate("/");
  }
  return <div>
    <h1>Welcome Mr(s). {cookies.get('firstName')}</h1>
    <br /><br />
    <button className="btn btn-danger" onClick={() => cerrarSesion()}>Cerrar Sesión</button>
  </div>;
};

export default Welcome;
