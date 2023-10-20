import Header from './Header';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../css/Edit.css';
import { interests,roles,tech, location } from '../assets/util/options';
import axios from 'axios';
import Cookies from 'js-cookie';
import x from "../assets/img/x.svg"

export default function(){
    const [editForm, setForm] = useState(JSON.parse(localStorage.getItem("user")));

    const [oldEmail, setOldEmail] = useState(JSON.parse(localStorage.getItem("user")).email)
    
    const [imgArr, setImg] = useState([
        "man.svg",
        "bird.svg",
        "woman.svg",
        "dog.svg",
        "compass.svg",
        "baby.svg",
    ]);
    const [avatar, setAvatar] = useState();
    const [techArr, setTech] = useState(JSON.parse(localStorage.getItem("user")).techStack);
    const [roleArr, setRole] = useState(JSON.parse(localStorage.getItem("user")).seeking);
    const [interestArr, setInterest] = useState(JSON.parse(localStorage.getItem("user")).fieldOfInterest);

    const navigate = useNavigate();

    useEffect(()=>{
        setForm({
            ...editForm,
            oldemail: editForm.email,
            _id: JSON.parse(localStorage.getItem("user"))._id
        })
    },[])

    function Update(e){
        e.preventDefault();
        //console.log("updating");
        setForm({
            ...editForm,
            techStack: techArr,
            seeking: roleArr,
            fieldOfInterest: interestArr,
            oldemail: JSON.parse(localStorage.getItem("user")).email,
            _id: JSON.parse(localStorage.getItem("user"))._id
        })

        // //console.log(editForm)

        axios.patch('http://localhost:4000/edit', { editForm },{withCredentials: true})
            .then(response => {
                // //console.log(response)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                
                navigate("/");
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(()=>{

    },[editForm])

    useEffect(()=>{
        setForm({
            ...editForm,
            techStack: techArr,
            seeking: roleArr,
            fieldOfInterest: interestArr
        })
    },[techArr])

    useEffect(()=>{
        setForm({
            ...editForm,
            techStack: techArr,
            seeking: roleArr,
            fieldOfInterest: interestArr
        })
    },[interestArr])

    useEffect(()=>{
        setForm({
            ...editForm,
            techStack: techArr,
            seeking: roleArr,
            fieldOfInterest: interestArr
        })
    },[roleArr])

    function RemoveInterest(idx){
        setInterest([
            ...interestArr.slice(0,idx),
            ...interestArr.slice(idx+1,interestArr.length)
        ])
    }

    function RemoveTech(idx){
        setTech([
            ...techArr.slice(0,idx),
            ...techArr.slice(idx+1,interestArr.length)
        ])
    }

    function RemoveRole(idx){
        setRole([
            ...roleArr.slice(0,idx),
            ...roleArr.slice(idx+1,interestArr.length)
        ])
    }

    return (
        <div>
            <Header />

            <div className="register">
                <Form.Control required type="text" value={editForm.name} placeholder="Enter Name" aria-label="name" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        name:e.target.value
                    })
                }} />

                <Form.Control required type="email" value={editForm.email} placeholder="Enter E-Mail" aria-label="E-Mail" aria-describedby="basic-addon1" onChange={(e)=>{
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
                }} type="text" placeholder="Enter Bio" value={editForm.bio} aria-label="bio" aria-describedby="basic-addon1" />

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
                    //console.log(interestArr)
                }}>
                    <option disabled>Add Fields Of Interest</option>
                    {interests.map((value)=>{
                        return <option>{value}</option>
                    })}
                </Form.Select>

                {interestArr.length>0 && <div className="display">
                    {interestArr.map((i,idx)=>{
                        return <div>{i} <img onClick={()=>RemoveInterest(idx)} className='cancel' src={x} /></div>
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
                    {roleArr.map((i,idx)=>{
                        return <div><div className='data'>{i}</div> <img onClick={()=>RemoveRole(idx)} className='cancel' src={x} /></div>
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
                    {techArr.map((i,idx)=>{
                        return <div>{i} <img onClick={()=>RemoveTech(idx)} className='cancel' src={x} /></div>
                    })}
                </div>}

                <div className='avatar'>
                    {!avatar && <div>Choose Avatar</div>}
                    {!avatar ? imgArr.map((i)=>{
                        return <img onClick={()=>{
                            setForm({
                                ...editForm,
                                gravatar: i
                            })
                            setAvatar(i)
                        }} src={"src/assets/img/"+i} />
                    }): <div>Chosen - <img src={"src/assets/img/"+editForm.gravatar} /></div>}
                </div>

                <Form.Control type="url" value={editForm.githubURL} required placeholder="Enter Github URL" aria-label="github" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        githubURL: e.target.value
                    })
                }} />

                <Form.Control type="url" required value={editForm.twitterURL} placeholder="Enter Twitter URL" aria-label="twitter" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        twitterURL: e.target.value
                    })
                }} />

                <Form.Control type="url" required value={editForm.websiteURL} placeholder="Enter Website URL" aria-label="website" aria-describedby="basic-addon1" onChange={(e)=>{
                    setForm({
                        ...editForm,
                        websiteURL: e.target.value
                    })
                }} />

                <Form.Control type="url" required value={editForm.linkedinURL} placeholder="Enter LinkedIn URL" aria-label="linkedin" aria-describedby="basic-addon1" onChange={(e)=>{
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