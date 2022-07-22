import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

import api from "../Components/api"


const Register = ({dataToEdit, setDataToEdit, user, setUser}) => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [user2, setUser2] = useState({
        id:"",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: ""
    })
console.log(user);
    const handleChange2 = (e) => {
        const { name, value } = e.target
        setUser(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
        console.log(user);
    }
   


    const Registrar = async (e) => {
         e.preventDefault()
        try {
            if (
                user.lastName === "" || user.firstName === "" ||
                user.email === "" || user.username === "" ||
                user.password === ""
            ) {
                console.error("Todos los campos son requeridos");
            }
            else {
                delete user.id;
                await api.post("/Users/Create", user)             
                    .then(res => setData(data.concat(res.data.data))
                    )

                alert("Registro exitoso");
                navigate("/")
                setUser(user2)
            }

        } catch (error) {
            console.error(error);
        }
    }
    const changeDataToEdit =()=>{
        setDataToEdit(false)
        setUser(user2)
    }



    const peticionPut = async (e) => {
        e.preventDefault()
        setDataToEdit(false)
       // navigate("/home")
        console.log(data, user);
        let dataAux = data
         await api.put("/Users/"+ user.id, user)
           .then(res => {
            console.log(res.data.data);
             dataAux.map(elem => {
                 //console.log(elem.id, user.id);
               if (elem.id === user.id) {         
                 elem.firstName = res.data.data.firstName;
                 elem.LastName = res.data.data.LastName;
                 elem.email = res.data.data.email;
                 elem.username = res.data.data.username;
                 elem.password = res.data.data.password   
               }
             })
             navigate("/");
             setUser(user2)
            
           }).catch(err => {
             console.log(err);
           })
        
       }
 
    return (
        <>
        {dataToEdit ?
        <form className="containerPrincipal" onSubmit={Registrar}>
            <Link to="/" className="btn btn-primary" onClick={changeDataToEdit}>
                Inicio
            </Link>
            <br />
            <br />
        
            <div className="containerLogin">
            <h2>Registro Usuario</h2>
                <div className="form-group">
                    <label>Usuario: </label>
                    <br />
                    <input
                        required
                        type="text"
                        className="form-control"
                        name="username"
                        value={user.username}
                        onChange={handleChange2}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        required
                        type="password"
                        className="form-control"
                        name="password"
                        value={user.password}
                        onChange={handleChange2}
                    />
                    <br />
                    <label>Correo: </label>
                    <br />
                    <input
                        required
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange2}
                    />
                    <br />

                    <label>Nombre: </label>
                    <br />
                    <input
                        required
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange2}
                    />
                    <br />
                    <label>Apellido: </label>
                    <br />
                    <input
                        required
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange2}
                    />
                    <br />
                    <button className="btn btn-success" >Registrate</button>
                </div>
            </div>
            </form>
            :
            <form className="containerPrincipal" onSubmit={peticionPut}>
            <Link to="/" className="btn btn-primary" onClick={changeDataToEdit}>
                Inicio
            </Link>
            <br />
            <br />
            <div className="containerLogin">
            <h2>Editar Usuario</h2>
                <div className="form-group">
                <label>ID: </label>
                    <br />
                    <input
                        readOnly
                        type="text"
                        className="form-control"
                        name="id"
                        value={user && user.id}
                        
                    />
                         <br />
                    <label>Usuario: </label>
                    <br />
                    <input
                       
                        type="text"
                        className="form-control"
                        name="username"
                        value={user && user.username}
                        onChange={handleChange2}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                      
                        type="password"
                        className="form-control"
                        name="password"
                        value={user && user.password}
                        onChange={handleChange2}
                    />
                    <br />
                    <label>Correo: </label>
                    <br />
                    <input
                    
                        type="email"
                        className="form-control"
                        name="email"
                        value={user && user.email}
                        onChange={handleChange2}
                    />
                    <br />

                    <label>Nombre: </label>
                    <br />
                    <input
                      
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={user && user.firstName}
                        onChange={handleChange2}
                    />
                    <br />
                    <label>Apellido: </label>
                    <br />
                    <input
                    
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={user && user.lastName}
                        onChange={handleChange2}
                    />
                    <br />


                    <button className="btn btn-success" onClick={peticionPut} >Actualizar</button>
                </div>
            </div>
        </form>
}
        </>

    );
};

export default Register;
