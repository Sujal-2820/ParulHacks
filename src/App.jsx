import { useLayoutEffect, useState } from "react";
import "./App.css";
import Hero from "./component/Hero/Hero.jsx";
import Login from "./component/Authentication/Login.jsx";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Intro from "./component/Hero/Intro.jsx";
//import VideoDisplay from "./component/VideoDisplay/VideoDisplay";
import Signup from "./component/Authentication/Signup.jsx";
import Employee from "./Screen/Employee.jsx";
import Admin from "./Screen/Admin.jsx";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import About from "./component/About/About";
import FooterNew from "./component/Footer/FooterNew";

function App() {
  const [user, setUser] = useState({ name: "", email: "", token: "" });
  const navigate = useNavigate("");
  const location = useLocation();
  const handleUser = (name, email, token) => {
    setUser({
      name: name,
      email: email,
      token: token,
    });
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    navigate("/");
  };
  const handleLogout = (e) => {
    e.preventDefault();
    // console.log("gg");
    axios
      .get(`http://localhost:8000/api/logout`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        console.log(response);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
      })
      .then(() => handleUser("", "", ""))
      .catch((err) => console.error(err));
  };
  useLayoutEffect(() => {
    let token = sessionStorage.getItem("token");
    let name = sessionStorage.getItem("name");
    let email = sessionStorage.getItem("email");

    if (token) {
      handleUser(name, email, token);
    }
  }, []);

  return (
    <div className="App">
      <Hero key={"Hero"} user={user} handleLogout={handleLogout} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            key={"Home"}
            path="/"
            element={
              <div>
                <Intro user={user} handleUser={handleUser} />
                <Employee user={user} handleUser={handleUser} />
              </div>
            }
          />
          <Route
            key={"Login"}
            path="/login"
            element={<Login user={user} handleUser={handleUser} />}
          />
          <Route
            key={"Signup"}
            path="/Signup"
            element={<Signup user={user} handleUser={handleUser} />}
          />
          <Route path="/About" element={<About />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>

      {/* <Footer key={"footer"} /> */}
      <FooterNew />
    </div>
  );
}

export default App;
