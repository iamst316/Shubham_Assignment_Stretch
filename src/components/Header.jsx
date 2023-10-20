import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/Header.css';
import axios from 'axios';

export default function(){

    const [auth, setAuth] = useState();
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        if (localStorage.getItem("token")){
            setAuth(localStorage.getItem("token"));
        }
    },[])

    function Logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    function DeleteAccount(){
        // setEmail(JSON.parse(localStorage.getItem("user")).email);
        const mail = JSON.parse(localStorage.getItem("user")).email;

        axios.delete(`https://bytive-server.onrender.com/delete/${mail}`)
            .then(res => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
                // //console.log(req)
            })
    }
    

    return (
        <header>
            <div className="icon-name">
                <img src="src/assets/img/logo.png" />
            </div>
            <div className="header-btns">
                <Button onClick={()=>navigate("/")} variant="primary">Browse Students</Button>
                {!auth ?
                    <Button onClick={()=> navigate("/login")} variant="success">Login/Register</Button> :
                    <>
                        <Button onClick={()=> navigate("/edit")} variant="warning">Edit Profile</Button>

                        <Button onClick={()=> DeleteAccount()} variant="outline-danger">Delete Account</Button>

                        <Button variant="danger" onClick={()=> Logout()}>Logout</Button>
                    </>
                }
            </div>
        </header>
    )
}