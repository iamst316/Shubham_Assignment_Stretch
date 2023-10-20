import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Profiles.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import ProfileTemp from "./ProfileTemp";

export default function(){
    const [profiles, setProfiles] = useState([]);
    const [query, setQuery] = useState();
    
    function Search(word){
        axios.post('http://localhost:4000/search', { query: word } )
            .then(response => {
                // //console.log(response);
                setProfiles(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(()=>{
        axios.get("http://localhost:4000/all")
            .then((res)=>{
                setProfiles(res.data);
                // //console.log(res.data);
            })
    },[])

    return (
        <div>
            <Header />

            <div className="search">

                <Form.Control type="text" placeholder="Search for Students by Names, Bio or Tech Stack" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=> setQuery(e.target.value)} />

                <Button onClick={()=> Search(query)} variant="outline-info">Search</Button>

            </div>

            <div className="profiles">
                {profiles.map((profile)=>{
                    return <ProfileTemp profile={profile} />
                })}
            </div>
        </div>
    )
}