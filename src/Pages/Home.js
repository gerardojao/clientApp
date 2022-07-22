import "bootstrap/dist/css/bootstrap.min.css";

import Loader from "../Components/Loader"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../Components/api"


export default function Home({dataToEdit, setDataToEdit , user, setUser}) {

    const [loading, setLoading] = useState(true)
    const [busqueda, setBusqueda] = useState("");
    const [data, setData] = useState([]);
   
    const navigate = useNavigate();

    const peticionGet = async () => {
        await api.get("/Users")
            .then(res => {
                setLoading(false)
                setData(res.data.data)
                //setUser(res.data.data)
            }).catch(err => {
                console.log(err);
            })
    
    }

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
        filter(e.target.value)
    }

    const filter = term => setData(user.filter(item => (item.username.toString().toLowerCase().includes(term.toLowerCase())) && item));



      const selectUser = user => {
       navigate("/register")
       setUser(user)       
      }

      const peticionDelete = async (id) => {
        console.log(id);
        await api.delete( "/Users/" + id)
          .then(res => {
            let isDelete = window.confirm(`Are you sure to delete ${id}`)
        isDelete && setData(data.filter(elem=>elem.id !== res.data))
          }).catch(err => {
            console.log(err);
          })
      }


    return (
        <div className="App">
            <br /><br />
            <button className="btn btn-success mb-4" onClick={() => insertar()}>Insertar nuevo Elemento</button><br />
            <button className="btn btn-primary mb-4" onClick={() => navigate("/login")}>Inicia Sesión</button>
            <div className="containerInput">
                <input
                    className="form-control inputBuscar"
                    type="text"
                    value={busqueda}
                    placeholder='Search by Username'
                    onChange={handleChange}
                />

            </div>
            <br />
            {loading 
          ? <Loader /> 
          :<table className="table table-bordered">
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
                    {data.map(user => (
                     
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>

                             <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={()=>selectUser(user)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={()=>peticionDelete(user.id)}
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
