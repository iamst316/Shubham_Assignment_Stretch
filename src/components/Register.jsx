import Header from './Header';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import { interests,roles,tech, location } from '../assets/util/options';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function(){
    const [regForm, setForm] = useState({})
    const [imgArr, setImg] = useState([
        "man.svg",
        "bird.svg",
        "woman.svg",
        "dog.svg",
        "compass.svg",
        "baby.svg",
    ]);
    const [techArr, setTech] = useState([]);
    const [roleArr, setRole] = useState([]);
    const [interestArr, setInterest] = useState([]);

    const navigate = useNavigate();

    function Register(e){
        e.preventDefault();

        setForm({
            ...regForm,
            techStack: techArr,
            seeking: roleArr,
            fieldOfInterest: interestArr
        })

        axios.post('https://bytive-server.onrender.com/signup', { regForm }, { withCredentials: true })
            .then(response => {

                const myCookieValue = Cookies.get("token");

                localStorage.setItem("token", myCookieValue);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                
                navigate("/");
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(()=>{
    //     //console.log(regForm);
    },[regForm])

    useEffect(()=>{
        setForm({
            ...regForm,
            techStack: techArr,
            seeking: roleArr,
            fieldOfInterest: interestArr
        })
    },[techArr])

    useEffect(()=>{
        setForm({
            ...regForm,
            techStack: techArr,
            seeking: roleArr,
            fieldOfInterest: interestArr
        })
    },[interestArr])

    useEffect(()=>{
        setForm({
            ...regForm,
            techStack: techArr,
            seeking: roleArr,
            fieldOfInterest: interestArr
        })
    },[roleArr])

    return (
        <div>
            <Header />

            <div className="register">
                <Form.Control required type="text" placeholder="Enter Name" aria-label="name" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...regForm,
                        name:e.target.value
                    })
                }} />

                <Form.Control required type="email" placeholder="Enter E-Mail" aria-label="E-Mail" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...regForm,
                        email:e.target.value
                    })
                }} />

                <Form.Control required type="password" placeholder="Enter Password" aria-label="Password" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...regForm,
                        password:e.target.value
                    })
                }} />

                <Form.Control required type="password" placeholder="Confirm Password" aria-label="Password" aria-describedby="basic-addon1" />

                <Form.Control required onChange={(e)=>{
                    setForm({
                        ...regForm,
                        bio:e.target.value
                    })
                }} type="text" placeholder="Enter Bio" aria-label="bio" aria-describedby="basic-addon1" />

                <Form.Select required aria-label="Default select example" onChange={(e)=>{
                    setForm({
                        ...regForm,
                        location:e.target.value
                    })
                }}>
                    <option disabled>Add Location</option>
                    {location.map((value)=>{
                        return <option>{value}</option>
                    })}
                </Form.Select>

                <Form.Select aria-label="Default select example" onChange={(e)=>{
                    if (!interestArr.includes(e.target.value)) {
                        setInterest([ ...interestArr, e.target.value])
                    } 
                    //console.log(interestArr)
                }}>
                    <option disabled>Add Fields Of Interest</option>
                    {interests.map((value)=>{
                        return <option>{value}</option>
                    })}
                </Form.Select>

                {interestArr.length>0 && <div className="display">
                    {interestArr.map((i)=>{
                        return <div>{i}</div>
                    })}
                </div>}

                <Form.Select aria-label="Default select example" onChange={(e)=>{
                    if (!roleArr.includes(e.target.value)) {
                        setRole([ ...roleArr, e.target.value ])
                    } 
                }}>
                    <option disabled>Seeking Roles</option>
                    {roles.map((value)=>{
                        return <option>{value}</option>
                    })}
                </Form.Select>

                {roleArr.length>0 && <div className="display">
                    {roleArr.map((i)=>{
                        return <div>{i}</div>
                    })}
                </div>}

                <Form.Select aria-label="Default select example" onChange={(e)=>{
                    if (!techArr.includes(e.target.value)) {
                        setTech([ ...techArr, e.target.value ])
                    } 
                }}>
                    <option>Enter Tech Skills</option>
                    {tech.map((value)=>{
                        return <option>{value}</option>
                    })}
                </Form.Select>

                {techArr.length>0 && <div className="display">
                    {techArr.map((i)=>{
                        return <div>{i}</div>
                    })}
                </div>}

                <div className='avatar'>
                    {!regForm.gravatar && <div>Choose Avatar</div>}
                    {!regForm.gravatar ? imgArr.map((i)=>{
                        return <img onClick={()=>{
                            setForm({
                                ...regForm,
                                gravatar: i
                            })
                        }} src={"src/assets/img/"+i} />
                    }): <div>Chosen - <img src={"src/assets/img/"+regForm.gravatar} /></div>}
                </div>

                <Form.Control type="url" required placeholder="Enter Github URL" aria-label="github" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...regForm,
                        githubURL: e.target.value
                    })
                }} />

                <Form.Control type="url" required placeholder="Enter Twitter URL" aria-label="twitter" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...regForm,
                        twitterURL: e.target.value
                    })
                }} />

                <Form.Control type="url" required placeholder="Enter Website URL" aria-label="website" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...regForm,
                        websiteURL: e.target.value
                    })
                }} />

                <Form.Control type="url" required placeholder="Enter LinkedIn URL" aria-label="linkedin" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...regForm,
                        linkedinURL: e.target.value
                    })
                }} />

                <Button variant="outline-success" onClick={(e)=> Register(e)}>Register</Button>
                
                <div onClick={()=>navigate("/login")}>Login?</div>
            </div>
        </div>
    )
}