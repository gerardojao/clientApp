import {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Welcome from '../Pages/Welcome';
import Home from '../Pages/Home';
import About from '../Pages/About';


function App() {
    const [dataToEdit, setDataToEdit] = useState(null)
    const [user, setUser] = useState({
        id:"",
        firstName:"",
        LastName:"",
        email:"",
        username:"",
        password:""
    });
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Home dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} user={user} setUser={setUser}/>} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} user={user} setUser={setUser} />} />
                <Route path='/welcome' element={<Welcome />} />
                <Route path='/about' element={<About />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;