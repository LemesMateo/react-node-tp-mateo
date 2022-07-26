import React, { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import axiox from "axios";

const Login = ({ setLogoutUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    axiox
      .post("https://mateo-tp-final-utn.herokuapp.com/api/users/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.JWT,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        setLogoutUser(false);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error:", error)
        setError(error.response.data.message)
      });
  };
  return (
    <div>
      <h2 className="text-orange-400 font-bold text-xl" >Login Page</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        noValidate
        autoComplete="off"
        onSubmit={login}
      >
        
  <div className="text-orange-300 mr-4  hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium capitalize" >
    E-mail
        <input
          id="username"
          type="text"
          className="text-slate-800 ml-4 p-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <br />
        <div className="text-orange-300 mr-4  hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium capitalize" >
            Password
        <input
          id="password"
          type="password"
          className="text-slate-800 ml-4 p-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <br />
        <button type="submit" className="text-orange-400 border rounded-lg text-bold text-xl" >
          Login
        </button>
      </form>
      <p>
        Don't have an account then please do{" "}
        <Link to="/register">Register</Link> yourself
      </p>
    </div>
  );
};

export default Login;