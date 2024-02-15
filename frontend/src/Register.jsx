import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      nav("/");
    }
  }, []);
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
    const data = {
      email,
      password,
    };
    const check = await fetch(
      `http://localhost:8080/login/${email}/${password}`
    );

    if (!check.ok) {
      throw new Error(`HTTP error! Status: ${check.status}`);
    }
    const checkData = await check.json();
    if (checkData.length === 1 && checkData[0] !== null) {
      alert("User already exists");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/login/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response.status);
      if (response.status === 201) {
        const response = await fetch(
          `http://localhost:8080/login/${email}/${password}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData);
        localStorage.setItem("user", JSON.stringify(responseData[0]));
        console.log(responseData[0]);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div id="register" className="container mt-5" style={{ width: "40%" }}>
      <h1>Register</h1>
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
            <Link style={{ textDecoration: "none" }} to="/">
              Login
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

export default Register;
