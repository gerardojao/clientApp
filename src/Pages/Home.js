import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "../Components/Loader"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../Components/api"
import { supabase } from '../supabase/client';
import "../css/Home.css"


export default function Home({dataToEdit, setDataToEdit , user, setUser}) {

    const [loading, setLoading] = useState(true)
    const [busqueda, setBusqueda] = useState("");
    const [data, setData] = useState([]);
    const [user2, setUser2] = useState([]);

    const navigate = useNavigate();

    const peticionGet = async () => {
        await api.get("/Users/")
            .then(res => {
                setLoading(false)
                setData(res.data)
                setUser2(res.data)
          
            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
      
        supabase.auth.onAuthStateChange((event, session) => {
            !session ? navigate("/login") : navigate("/")
            console.log(event, session)
        })   
        
     
    }, [])

    useEffect(() => {
        !supabase.auth.user() && navigate("/login")
    }, [navigate])

    useEffect(() => {
        peticionGet();
    }, [])
    
    useEffect(() => {
        peticionGet();
    }, [data])

    const insertar = () => {
        setDataToEdit(true)
        navigate("/register")
    }

    const handleChange = e => {
        
        setBusqueda(e.target.value)      
    }

    let results = !busqueda ? data : data.filter(item=>item.UserName.toLowerCase().includes(busqueda.toLocaleLowerCase()))

      const selectUser = user => {
       navigate("/register")
       setUser(user)       
      }

      const peticionDelete = async (id) => {
        
        await api.delete( "/Users?Id=" + id)
            .then(res => {
            let isDelete = window.confirm(`Are you sure to delete ${id}`)
                isDelete && setData(data.filter(elem=>elem.UserId !== res.data))
          }).catch(err => {
            console.log(err);
          })
      }

    const cerrarSesion = ()=>{
        window.confirm("Do you want to close session?")
        supabase.auth.signOut()
    }



    return (
        <div className="App">
            <br /><br />
           
            {/* <button className="btn btn-primary mb-4" onClick={() => navigate("/login")}>Inicia Sesión</button><br /> */}
            <div className="containerInputClose">
            <button className="btn btn-success " onClick={() => insertar()}>Insertar nuevo Elemento</button>

                <div className="containerInput">
                    <input
                        className="form-control inputBuscar"
                        type="text"
                        value={busqueda}
                        placeholder='Search by Username'
                        onChange={handleChange}
                    />

                </div>
                <button className="btn btn-danger closeSession" onClick={() =>cerrarSesion()}>Cerrar Sesión</button>

            </div>
            
            <br />
            {loading 
          ? <Loader /> 
          :<table style={{"textAlign":"center"}} className="table table-bordered">
                <thead >
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                        <th>USERNAME</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(user => (
                     
                        <tr key={user.Id}>
                            <td>{user.Id}</td>
                            <td>{user.Name}</td>
                            <td>{user.LastName}</td>
                            <td>{user.Email}</td>
                            <td>{user.UserName}</td>

                             <td>
                                <button
                                style={{"marginRight":"10px"}}
                                    className="btn btn-primary"
                                    onClick={()=>selectUser(user)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={()=>peticionDelete(user.UserId)}
                                >
                                    Eliminar
                                </button>
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </table>
}

        </div>
    );
}
