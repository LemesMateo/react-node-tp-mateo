import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiox from "axios";
import { useRegisterUserMutation } from "../../services/authApi";
import {toast} from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
const Register = ({ setLogoutUser }) => {
  const [formValue, setFormValue] = useState(initialState);
  const {loading, error} = useSelector((state) => ({...state.auth}));
  const {email, password, name, confirmPassword} = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=> {
    error && toast.error(error);
  }, [error])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        return toast.error("Password should match");
    }
    if (email && password && name && confirmPassword) {
        dispatch(register({formValue, navigate, toast}));
    }
  };
  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  };
  
  /* const [errorMsg, setErrorMsg] = useState(""); 
  const [registerUser, {data, isError, error}] = useRegisterUserMutation();

  useEffect(()=> {
    if (data && data.JWT) {
        localStorage.setItem(
            "login",
            JSON.stringify({
                userLogin: true,
                token: JWT,
            })
        );
        setErrorMsg("");
        setName("");
        setEmail("");
        setPassword("");
        setLogoutUser(false);
        navigate("/");
    }
    if (isError) {
        setErrorMsg(error.response.data.message);
    }
    console.log(data)
  }, [data, isError]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
        return error()
    }
    if ( email && password && name && confirmpassword) {
        dispatch(register({formValue, navigate}))
    }
  }
  const register = async (e) => {
    e.preventDefault();
    await registerUser({name, email, password}) */
    /* axiox
      .post("http://localhost:5000/api/users/register", {
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
        navigate.push("/");
      })
      .catch((error) => {
        console.log("Error:", error)
        setError(error.response.data.message)
      }); */
//  };
  return (
    <div>
      <h2>Register Page</h2>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize" >
            Name:
        <input
          id="username"
          type="text"
          className="text-slate-800"
          value={name}
          onChange={onInputChange}
          required
        />
        </div>
        <div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize" >
            Email:
        <input
          id="email"
          type="text"
          className="text-slate-800"
          value={email}
          onChange={onInputChange}
        />
        </div>
        <br />
        <div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize" >
            Password
        <input
          id="password"
          type="password"
          className="text-slate-800"
          value={password}
          onChange={onInputChange}
        />
        </div>
        <div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize" >
            Confirm Password
        <input
          id="password"
          type="password"
          className="text-slate-800"
          value={confirmpassword}
          onChange={onInputChange}
        />
        </div>
        <br />
        <button
          type="submit"
        >
          Register
        </button>
      </form>
      <p>
        Already have an account then please <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;