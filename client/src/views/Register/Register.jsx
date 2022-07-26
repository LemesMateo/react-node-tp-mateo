import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiox from "axios";
import { useRegisterUserMutation } from "../../services/authApi";
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
const Register = ({ setLogoutUser }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();


  useEffect(() => {
    if(password !== repassword)
      setError("La password no coincide")
    else
      setError("")
  }, [repassword])
  
  const register = (e) => {
    
    e.preventDefault();
    axiox
      .post("https://mateo-tp-final-utn.herokuapp.com/api/users/register", {
        email,
        password,
        name
      })
      .then((response) => {
        console.log("response", response);
        setError("");
        setEmail("");
        setPassword("");
        setName("");
        setRepassword("");
        setLogoutUser(true);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error:", error)
        setError(error.response.data.message)
      });
  };
  return (
    <div>
      <h2 className="text-orange-400 font-bold text-xl" >Register Page</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        noValidate
        autoComplete="off"
        onSubmit={register}
      >

        <div className="text-orange-300 mr-4  hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium capitalize" >
          E-mail
          <input
            id="email"
            type="text"
            className="text-slate-800 ml-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="text-orange-300 mr-4  hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium capitalize" >
          Name
          <input
            id="name"
            type="text"
            className="text-slate-800 ml-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="text-orange-300 mr-4  hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium capitalize" >
          Repeat Password
          <input
            id="repassword"
            type="password"
            className="text-slate-800 ml-4 p-4"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
        </div>
        <br />

        <button type="submit" disabled={(password !== repassword) || password ==''} className="fancybuttonaccept font-lato font-bold sm:text-xl text-sm text-white capitalize p-2 mr-4" >
          Register
        </button>
      </form>
      <p>
        Don't have an account then please do{" "}
        <Link to="/register">Register</Link> yourself
      </p>
    </div>
  );
};

export default Register;