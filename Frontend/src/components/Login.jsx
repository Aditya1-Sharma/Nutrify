import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [userCred, setuserCred] = useState({
    email: "",
    password: "",
  });

  const [msg, setmsg] = useState({
    type: "",
    text: "",
  });
  function handleInput(e) {
    setuserCred((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(userCred);

    fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(userCred),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          setmsg({ type: "Invalid Credential", text: response.statusText });
        }
        setuserCred(() => {
          return { email: "", password: "" };
        });
        setTimeout(() => {
          setmsg({
            type: "",
            text: "",
          });
        }, 5000);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.token !== undefined) {
          setmsg({ type: "Sucess", text: data.message });
          localStorage.setItem("nutrify-user", JSON.stringify(data));
          navigate("/track");
        }
      })
      .catch((err) => {
        console.log("Fetch error: ", err);
      });
  }
  return (
    <>
      <section className="container">
        <form action="" className="form" onSubmit={handleSubmit}>
          <h1>Focus on Fitness</h1>

          <div>
            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              type="email"
              className="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              value={userCred.email}
            />
          </div>
          <div>
            <label htmlFor="password">Enter your password</label>
            <input
              id="password"
              type="password"
              className="password"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
              value={userCred.password}
            />
          </div>
          <button className="btn">Login</button>
          <p>{msg.text}</p>
          <Link to="/register">
            <p> Don't have a account ? Register Now</p>
          </Link>
        </form>
      </section>
    </>
  );
}

export default Login;
