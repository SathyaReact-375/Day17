import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Task9() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        console.log('response received', response);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API error', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  axios.interceptors.request.use(
    (config) => {
      console.log("request going", config);
      return config;
    },
    (error) => {
      console.log("request error", error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log("response received in interceptor", response);
      return response;
    },
    (error) => {
      console.log("response error in interceptor", error);
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
    {data && (
      <div style={{textAlign:"center"}}>
        <h1>Task10</h1>
        <h2>{data.title}</h2>
        <p>User ID: {data.userId}</p>
        <p>ID: {data.id}</p>
        <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
      </div>
    )}
  </>
  );
}

export default Task9;