import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

function Task13() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <RequestRetryInterceptor />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
            <div style={{textAlign:"center"}}>
                <h1>Task13</h1>
          <h2>{data.title}</h2>
          <p>User ID: {data.userId}</p>
          <p>ID: {data.id}</p>
          <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
          </div>
      )}
    </>
  );
}

function RequestRetryInterceptor() {
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        config.headers['X-Retry-Count'] = config.headers['X-Retry-Count'] || 0;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const { config, response } = error;

        if (!config || config.__isRetryRequest || config.headers['X-Retry-Count'] >= MAX_RETRIES) {
          return Promise.reject(error);
        }

        const shouldRetry =
          !response ||
          response.status === 0 ||
          (response.status >= 500 && response.status < 600);

        if (shouldRetry) {
          config.headers['X-Retry-Count']++;
          config.__isRetryRequest = true;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          return axios(config);
        }

        return Promise.reject(error);
      }
    );

    const requestInterceptorId = axios.interceptors.request.handlers.length - 1;
    const responseInterceptorId = axios.interceptors.response.handlers.length - 1;

    return () => {
      axios.interceptors.request.eject(requestInterceptorId);
      axios.interceptors.response.eject(responseInterceptorId);
    };
  }, []);

  return null;
}

export default Task13;