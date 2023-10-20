import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


export default function(){
    const [loginForm, setForm] = useState({})
    const [incorrect, setMessage] = useState("")
    const navigate = useNavigate();

    function Login(e){
        e.preventDefault();
        // //console.log(loginForm);

        axios.post('http://localhost:4000/login', { loginForm }, { withCredentials: true })
            .then(response => {

                const myCookieValue = Cookies.get("token");
                //console.log("res->",response);
                if (response.data.message=="Incorrect password or email"){
                    setMessage(response.data.message)
                }
                else{
                    localStorage.setItem("token", myCookieValue);
                    localStorage.setItem("user", JSON.stringify(response.data.user))
                    navigate("/");
                }
                
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <div>
            <Header />

            <div className="login">
                <Form.Control type="mail" placeholder="Enter E-Mail" aria-label="E-Mail" aria-describedby="basic-addon1" onChange={(e)=>{setForm({
                    ...loginForm,
                    email: e.target.value
                })}} />

                <Form.Control type="password" placeholder="Enter Password" aria-label="Password" aria-describedby="basic-addon1" onChange={(e)=>{setForm({
                    ...loginForm,
                    password: e.target.value
                })}} />

                <Button onClick={(e)=> Login(e)} variant="outline-success">Login</Button>
                
                <div onClick={()=>navigate("/register")}>Register?</div>
                <div className="message">{incorrect}</div>
            </div>
        </div>
    )
}