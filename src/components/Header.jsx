import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/Header.css';
import axios from 'axios';

export default function(){

    const [auth, setAuth] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        if (localStorage.getItem("token")){
            setAuth(localStorage.getItem("token"));
            // console.log(auth);    
        }
    },[])

    function Logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    function DeleteAccount(){
        const email = localStorage.getItem("user").email;

        axios.delete("http://localhost:4000/delete",{ email })
            .then(res => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
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