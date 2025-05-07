import React, { useEffect} from 'react'
import axios from "axios"

function Task4() {
        useEffect(()=>{
          axios.get("https://jsonplaceholder.typicode.com/users") 
          .then(response => console.log(response.data))
          .catch(error => {
            if (error.response) {
            console.error("Server responded with:", error.response.status);
            } else if (error.request) {
            console.error("No response received:", error.request);
            } else {
            console.error("Error:", error.message);
            }
            });
        })
          
  return (
    <>
        <h1 style={{textAlign:"center"}}>Task4</h1>
        <p style={{textAlign:"center"}}>completed see the console</p>
    </>
  )
}

export default Task4