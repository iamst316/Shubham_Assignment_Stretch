import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';


export default function(props){
    const {name, gravatar, techStack,location} = props.profile;
    
    return (
        <div className="entry">
            <div className="left">
                <img src={'src/assets/img/'+ gravatar} />
                <div className="details">
                    <div className="name">{name}</div>
                    <div className="location">{location}</div>
                    <div className="tech">
                        {techStack.map((i)=>{
                            return <div>{i}</div>
                        })}
                    </div>
                </div>
            </div>
            <div className="right">
                <Button variant="outline-warning">View Profile</Button>
            </div>
        </div>
    )
}