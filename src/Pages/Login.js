import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import "../css/Login.css"
import axios from "axios"

import Cookies from 'universal-cookie/es6';
const Login = () => {
    const url = "https://localhost:44300/api/Users"
    const cookies = new Cookies()
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })

    }
    const iniciarSesion = async () => {

        // await axios.get(`${url}/${form.username}/${form.password}`)
        await axios.get(`${url}`)
            .then(res => res.data.data)
            .then(res => {
                if (res.length > 0) {
                    let response = res[0]                  
                    cookies.set('firstName', response.firstName, { path: "/" })

                    alert(`Bienvenido ${response.firstName}`)
                    navigate('/welcome')
                  
                }
                else console.log("User or Password incorrect")
               
            })


    }
    const registro = () => {
        navigate('/register')

    }

    return (
        <div className="containerPrincipal">
            <div className="containerLogin">
                <div className="form-group">
                    <label>Usuario: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <br />
                    <button className="btn btn-primary" onClick={() => iniciarSesion()}>Iniciar Sesión</button><br /><br />
                    <button className="btn btn-success" onClick={() => registro()}>Registrate</button>
                </div>
            </div>
        </div>
    )
};

export default Login;
