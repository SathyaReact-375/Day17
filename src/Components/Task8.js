import React, { useEffect, useState } from 'react';
import axios from "axios";

function Task8() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser([]);
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUser(res.data);
      })
      .catch(error => {
        setUser([]);
      });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUser((prevUsers) => prevUsers.filter((use) => use.id !== id));
      })
      .catch(error => {
        
      });
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Task8 - Delete Request</h1>
        {user.map(use => (
          <div key={use.id}>
            <p>{use.name}</p>
            <button onClick={() => deleteUser(use.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Task8;