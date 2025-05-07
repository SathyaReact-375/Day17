import axios from 'axios'
import React, { useEffect } from 'react'

function Task7() {

    useEffect(()=>{
        axios.put("https://jsonplaceholder.typicode.com/posts/1",{
            userId:1,
            body:"i have changed This is Text"
        })
        .then((res)=>console.log(res.data))
    },[])
  return (
    <>
    <div style={{textAlign:"center"}}>
    <h1>Task7</h1>
    <p>completed</p>
    </div>
    </>
  )
}

export default Task7