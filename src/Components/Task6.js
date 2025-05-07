import axios from 'axios'
import React, { useEffect } from 'react'

function Task6() {

    useEffect(()=>{
        axios.post("https://jsonplaceholder.typicode.com/posts",{
            userId:1,
            body:"This is Text"
        })
        .then((res)=>console.log(res.data))
    },[])
  return (
    <>
    <div style={{textAlign:"center"}}>
    <h1>Task6</h1>
    <p>completed</p>
    </div>
    </>
  )
}

export default Task6