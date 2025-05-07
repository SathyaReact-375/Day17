import React, { useEffect, useState } from 'react';
import axios from "axios";

function Task5() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    setLoading(true); 
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUser(res.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching users:", error); 
        setLoading(false); 
      },5000);
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Task5</h1>
        {loading ? (
          <p>Loading...</p> 
        ) : (
          user.map(use => (
            <p key={use.id}>{use.name}</p> 
          ))
        )}
      </div>
    </>
  );
}

export default Task5;