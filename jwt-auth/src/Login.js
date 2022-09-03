import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axiox from "axios";
import { Link } from "react-router-dom";
import Select from 'react-select';
import Home from "./Home";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));

const Login = ({ setLogoutUser }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [usertype, setUsertype] = useState("");
  const [error, setError] = useState("");
  let history = useNavigate();

  // const options1 = [
  //   { value: 'admin', label: 'admin' },
  //   { value: 'user', label: 'user' },
  // ];
  // const [usertype, setUsertype] = useState("");



  const login = (e) => {
    e.preventDefault();
    axiox
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
        // usertype
      })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        // setUsertype("");
        setLogoutUser(false);
        history("/");
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div style={{marginTop:"100px"}}>
      <h2>Login Page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={login}
      >
        <TextField
          id="username"
          label="Username"
          type="text"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <br />

        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <br/>

        
        {/* <label>User Type</label><br/>
          <div style={{width:"50vh",display: "flex",alignItems:"center",justifyContent:"center",paddingLeft:"36%"}}>
          <Select
            defaultValue={usertype}
            onChange={(e)=>setUsertype(e.value)}
            options={options1}
          />
        </div> */}

        <br />

        
        
        <br/>
        
        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
      <p>
        Don't have an account then please do{" "}
        <Link to="/register">Register</Link> yourself
      </p>
      
    </div>
  );
}

export default Login;