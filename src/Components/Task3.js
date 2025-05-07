import React, { useEffect, useState } from 'react'
import axios from "axios"
function Task3() {
    const[user,setUser]=useState([])
    useEffect(()=>{
      axios.get("https://jsonplaceholder.typicode.com/users") 
      .then((res)=>{
        setUser(res.data)
      }) 
      .catch(error => {
        console.error("Error fetching users:", error);
        });
    },[])
  return (
    <>
    <div style={{textAlign:"center"}}>
        <h1>Task3</h1>
    {user.map(use => (
 <p key={use.id}>{use.name}</p>
 ))}
    </div>
    </>
  )
}

export default Task3