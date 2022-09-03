import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axiox from "axios";
import { Link } from "react-router-dom";
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));

const Register = ({ setLogoutUser }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");

  const options1 = [
    { value: 'admin', label: 'admin' },
    { value: 'user', label: 'user' },
  ];
  const [usertype, setUsertype] = useState("");

  const options2 = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];
  const [gender, setGender] = useState("");
  


  // const [usertype, setUsertype] = useState("");
  // const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  let history = useNavigate();



  const register = (e) => {
    debugger
    e.preventDefault();
    axiox
      .post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        dateofbirth,
        usertype,
        gender
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
        setName("");
        setDateofbirth("");
        // setUsertype("");
        setGender("");
        setLogoutUser(false);
        history("/");
      })
      .catch((error) => setError(error.response.data.message));
      debugger
  };

  return (
    <div style={{marginTop:"100px"}}>
      <h2>Register Page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={register}
      >

        <TextField
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <br />

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
        <br />

        <TextField 
          id="dateofbirth"
          label="Date Of Birth"
          type='date'
          value={dateofbirth}
          onChange={(e)=>setDateofbirth(e.target.value)}
        />
        <br/>

          <label>User Type</label><br/>
          <div style={{width:"50vh",display: "flex",alignItems:"center",justifyContent:"center",paddingLeft:"36%"}}>
          <Select
          defaultValue={usertype}
          onChange={(e)=>setUsertype(e.value)}
          options={options1}
          />
        </div>

        <label>Gender</label><br/>
          <div style={{width:"50vh",display: "flex",alignItems:"center",justifyContent:"center",paddingLeft:"36%"}}>
          <Select
          defaultValue={gender}
          onChange={(e)=>setGender(e.value)}
          options={options2}
          />
        </div>

        <br/>
        <br/>

        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
      <p>
        Already have an account then please {" "}
        <Link to="/login">Login</Link> yourself
      </p>
    </div>
  );
}

export default Register;