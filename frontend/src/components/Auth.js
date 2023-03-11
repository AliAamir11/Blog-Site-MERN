import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={400}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin="auto"
        marginTop={5}
        borderRadium={5}
      >
        <Typography variant="h3" padding={3} textAlign="center">
          {isSignup ? "Sign Up" : "Login"}
        </Typography>
        {isSignup && (
          <TextField
            value={inputs.name}
            name="name"
            onChange={handleChange}
            placeholder="Name"
            margin="normal"
          />
        )}
        <TextField
          value={inputs.email}
          name="email"
          onChange={handleChange}
          type={"email"}
          placeholder="Email"
          margin="normal"
        />
        <TextField
          value={inputs.password}
          name="password"
          onChange={handleChange}
          type={"password"}
          placeholder="Password"
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3 }}
          color="warning"
        >
          Submit
        </Button>
        <Button onClick={() => setIsSignup(!isSignup)} sx={{ borderRadius: 3 }}>
          Change To {isSignup ? "Login" : "Sign Up"}
        </Button>
      </Box>
    </form>
  );
};

export default Auth;
