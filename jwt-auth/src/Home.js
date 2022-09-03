import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Dashboard from 'app-b-dashboard/container' 
// import users from '../../../hackathon/server/users.json';
// import Dashboard from 'app-b-dashboard/container'




const Home = (props) => {
  console.log("Fieldsmails",props)
  debugger
  const [value,setValue]=useState()
  console.log("setvalue",value)
  // const classes = useStyles();
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [usertype, setUsertype] = useState("");
  // const [dateofbirth, setDateofbirth] = useState("");
  // const [error, setError] = useState("");

  // const login = (e) => {
  //   e.preventDefault();
  //   axiox
  //     .post("http://localhost:5000/api/auth/", {
  //       name,
  //       email,
  //       password,
  //       usertype,
  //       dateofbirth
  //     })
  //     .then((response) => {
  //       console.log("response", response);
  //       localStorage.setItem(
  //         "login",
  //         JSON.stringify({
  //           userLogin: true,
  //           token: response.data.access_token,
  //         })
  //       );
  //       // setError("");
  //       // setEmail("");
  //       // setPassword("");
  //       // setUsertype("");
  //       // setLogoutUser(false);
  //       // history("/");
  //     })
  //     .catch((error) => setError(error.response.data.message));
  // };
  // const data=require('../../../hackathon/server/users.json');
  
  const axios = require('axios');

  function HandleEdit(ID){

  }

  function HandleDelete(ID){
    
  }

  axios.get("http://localhost:5000/api/auth/")
    .then(resp => {
        // console.log("Sanjay Kumar1",resp.data.OutputData.users);
        let data = resp.data.OutputData.users;
        setValue(data)
        // console.log("myarrayvalue",data);
        // data.forEach(e => {
        //     // console.log("Sanjay Kumar3",e)
        //     console.log(`${e.name}, ${e.id}, ${e.email}`);
        // });
    })
    .catch(error => {
        console.log("SanjayKumar2",error);
    });



  const isLoginTrue = JSON.parse(localStorage.getItem("login"));

  const userNotLogin = () => (
    <>
      <h2>It seem's like you are not login</h2>
      <h3>
        If you have an account, then please <Link to="/login">Login</Link>
      </h3>
      <h3>
        Don't have an account, then please do{" "}
        <Link to="/register">Register</Link>
      </h3>
    </>
  );
  // const a=9
  // console.log("SanjaySharma",value[0].name)
  return (
    <div style={{ marginTop: "100px" }}>
      {isLoginTrue && isLoginTrue.userLogin ? (
        <>
        <h2>Welcome Back User</h2>
        {/* <h2>{props.email}</h2> */}
        <table border="1" cellspacing="0" cellpadding="0"  className="table table-bordered">
            <thead>
               <tr>
                <th>
                 Id
                </th>
                <th>
                 Name   
                </th>
                <th>
                    Date Of Birth
                </th>
                <th>
                    UserName
                </th>
                <th>
                    Password
                </th>
                <th>
                    Gender
                </th>
                <th>
                    Usertype
                </th>
               </tr>
               
            </thead>
            <tbody> 
                   {
                    value && value.length > 0
                    ?
                    value.map((item) => {
                        return(
                            <tr>
                               <td>
                                {item.id}
                                </td>
                                <td>
                                   {item.name} 
                                </td> 
                                <td>
                                    {item.dateofbirth.split('T')[0]}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {item.password}
                                </td>
                                <td>
                                    {item.gender}
                                </td>
                                <td>
                                   {
                                    item.usertype === 'admin' ? 'Admin' : 'User'
                                   } 
                                     
                                    
                                </td>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={()=> HandleEdit(item.id)}>Edit</button>
                                    <button type="button" className="btn btn-primary" onClick={()=> HandleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    :
                    "No Data Available"
                   }
            </tbody>

                </table>
        
        </>
        
      ) : (
        <>{userNotLogin()}</>

      )}
    </div>
  );
};

export default Home;