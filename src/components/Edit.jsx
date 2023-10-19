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
    const [editForm, setForm] = useState({})
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

    function Update(e){
        e.preventDefault();

        setForm({
            ...editForm,
            techStack: techArr,
            seeking: roleArr,
            fieldOfInterest: interestArr
        })

        axios.post('http://localhost:4000/edit', { editForm }, { withCredentials: true })
            .then(response => {

                const myCookieValue = Cookies.get("token");

                localStorage.setItem("token", myCookieValue);
                localStorage.setItem("user", response.user)
                
                navigate("/");
            })
            .catch(error => {
                console.error(error);
            });
    }

    // useEffect(()=>{
    //     console.log(editForm);
    // },[editForm])

    return (
        <div>
            <Header />

            <div className="register">
                <Form.Control required type="text" placeholder="Enter Name" aria-label="name" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        name:e.target.value
                    })
                }} />

                <Form.Control required type="email" placeholder="Enter E-Mail" aria-label="E-Mail" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        email:e.target.value
                    })
                }} />

                <Form.Control required type="password" placeholder="Enter Password" aria-label="Password" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        password:e.target.value
                    })
                }} />

                <Form.Control required type="password" placeholder="Confirm Password" aria-label="Password" aria-describedby="basic-addon1" />

                <Form.Control required onChange={(e)=>{
                    setForm({
                        ...editForm,
                        bio:e.target.value
                    })
                }} type="text" placeholder="Enter Bio" aria-label="bio" aria-describedby="basic-addon1" />

                <Form.Select required aria-label="Default select example" onChange={(e)=>{
                    setForm({
                        ...editForm,
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
                    console.log(interestArr)
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
                    {!editForm.gravatar && <div>Choose Avatar</div>}
                    {!editForm.gravatar ? imgArr.map((i)=>{
                        return <img onClick={()=>{
                            setForm({
                                ...editForm,
                                gravatar: i
                            })
                        }} src={"src/assets/img/"+i} />
                    }): <div>Chosen - <img src={"src/assets/img/"+editForm.gravatar} /></div>}
                </div>

                <Form.Control type="url" required placeholder="Enter Github URL" aria-label="github" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        githubURL: e.target.value
                    })
                }} />

                <Form.Control type="url" required placeholder="Enter Twitter URL" aria-label="twitter" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        twitterURL: e.target.value
                    })
                }} />

                <Form.Control type="url" required placeholder="Enter Website URL" aria-label="website" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        websiteURL: e.target.value
                    })
                }} />

                <Form.Control type="url" required placeholder="Enter LinkedIn URL" aria-label="linkedin" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        linkedinURL: e.target.value
                    })
                }} />

                <Button variant="outline-success" onClick={(e)=> Update(e)}>Update</Button>
                
            </div>
        </div>
    )
}