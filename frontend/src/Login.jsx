import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/login/${email}/${password}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      if (responseData.length === 1 && responseData[0] === null) {
        alert("Invalid Credentials");
        return;
      }
      localStorage.setItem("user", JSON.stringify(responseData[0]));
      console.log(responseData[0]);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="container mt-5" style={{ width: "40%" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={handleEmail}
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handlePassword}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
          <button className="btn btn-outline-primary mt-2 mx-3">
            <Link style={{ textDecoration: "none" }} to="/register">
              Register
            </Link>
          </button>
        </div>
      </form>
      <div>
        {localStorage.getItem("user") && (
          <p>{localStorage.getItem("user").email}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
