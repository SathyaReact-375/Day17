import React from 'react'

function Task1() {
  return (
    <>
    <div style={{textAlign:"center"}}>
    <h1>Task1</h1>
    <h2>Introduction to Axios</h2>
  <p>
    Axios is a popular JavaScript library used for making HTTP requests from 
    both browsers and Node.js environments. It simplifies interaction with APIs 
    and is highly customizable for handling requests and responses effectively.
  </p>
  <h3>Advantages over fetch():</h3>
  <ul style={{listStyleType:"none"}}>
    <li>Automatic JSON conversion: Axios automatically parses JSON responses, whereas <code>fetch()</code> requires manual parsing.</li>
    <li>Interceptors: Axios allows you to intercept requests and responses, making it easier to handle errors or modify requests.</li>
    <li>Ease of configuration: Axios provides a centralized way to configure base URLs, headers, and other defaults.</li>
    <li>Promise-based: Like <code>fetch()</code>, Axios is promise-based, but it has better error handling with clearer rejection for HTTP errors.</li>
    <li>Supports older browsers: Axios offers broader compatibility for legacy browsers compared to <code>fetch()</code>.</li>
  </ul>
  <h1>Task2</h1>
  <p> Installed Axios</p>
    </div>
    </>
  )
}

export default Task1