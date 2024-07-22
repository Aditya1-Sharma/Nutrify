import React, { useEffect, useState } from "react";
import "../style/Register.css";
import { Link } from "react-router-dom";
function Register() {
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const [msg, setmsg] = useState({
    type: "",
    text: "",
  });
  function handleInput(e) {
    console.log(e.target.name, e.target.value);
    setuserDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(userDetails);
    fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }

        setuserDetails({
          name: "",
          email: "",
          password: "",
          age: "",
        });

        setTimeout(() => {
          setmsg({
            type: "",
            text: "",
          });
        }, 5000);
        // Converting the data into the json
        return res.json(); // Assuming the response is JSON
      })
      .then((data) => {
        console.log(data); // Handle the JSON response data
        setmsg({ type: "Sucess", text: data.message });
      })
      .catch((err) => {
        console.log("Fetch error: ", err);
      });
  }
  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);
  return (
    <>
      <section className="container reg">
        <form action="" className="form" onSubmit={handleSubmit}>
          <h1>Focus on Fitness</h1>
          <p>
            <label htmlFor="name">Enter your Name</label>
            <input
              id="name"
              type="text"
              className="inp"
              placeholder="Enter name"
              name="name"
              onChange={handleInput}
              value={userDetails.name}
              required
            />
          </p>
          <p>
            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              type="email"
              className="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              value={userDetails.email}
              required
            />
          </p>
          <p>
            <label htmlFor="password">Enter your password</label>
            <input
              id="password"
              type="password"
              className="password"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
              value={userDetails.password}
              required
              maxLength={8}
            />
          </p>
          <p>
            <label htmlFor="age">Enter your age</label>
            <input
              id="age"
              type="text"
              className="age"
              placeholder="Enter age"
              name="age"
              onChange={handleInput}
              value={userDetails.age}
              required
              min={12}
            />
          </p>
          <button className="btn">Join</button>
          <p>{msg.text}</p>
          <Link to="/login">
            <p>Already Registered ? Login</p>
          </Link>
        </form>
        {/* <button
          className="btn"
          onClick={() => {
            setuserDetails((prevState) => {
              return { ...prevState, name: "Aditya" };
            });
          }}>
          Click
        </button> */}
      </section>
    </>
  );
}

export default Register;
