import React, { useState } from "react";
import "./App.css";
import { BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import Register from "./Register";

function App() {
  const [logoutUser, setLogoutUser]=useState(false)
  return (
        // <>
        //   <div className="App">
        //     <h2>JWT Authentication using JSON fake server</h2>
        //     <Router>
        //       <Route path="/login" element={<Login/>}/>
        //     </Router>
        //   </div>
        // </>
        <div className="App">
          <h2>JWT Authentication using JSON fake server</h2>
          <BrowserRouter>
            <Routes>

              <Route exact path="/" element={<>
              <Header logoutUser={logoutUser} setLogoutUser={setLogoutUser}/> 
              <Home logoutUser={logoutUser}/>
              </>}>
              </Route>

              <Route path="/login" element={<>
              <Login setLogoutUser={setLogoutUser}/>
              </>}/>
              <Route/>

              <Route path="/register" element={<>
              <Register setLogoutUser={setLogoutUser}/>
              </>}/>
              <Route/>

              

            </Routes>
            
          </BrowserRouter>
      </div>
  );
}

export default App;
