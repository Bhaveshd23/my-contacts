import React, { useState, useEffect, useContext } from "react";
import Main from "./component/Main";
import Searchbox from "./component/Searchbox";
import Sidebar from "./component/Sidebar";
import UserContext from "./context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [contactData, setContactData] = useState([]);
  const [username, setUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [checked, setChecked] = useState(false);
  
  const navigate = useNavigate();
  useEffect(() => {
    !user && navigate("/login", { replace: true });
    // eslint-disable-next-line
  },[]);
  
  const { user } = useContext(UserContext);
  useEffect(() => {
    // setTimeout(()=>{

    // },500)
    fetch("https://server-contact-manager.herokuapp.com/contact", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => setContactData(res))
      .catch((err) => console.log(err));
  }, []);
  // console.log(user)

  return (
    <>
      <Sidebar />
      <Searchbox
        username={username}
        setUsername={setUsername}
        searchEmail={searchEmail}
        setSearchEmail={setSearchEmail}
      />
      <Main
        contactData={contactData}
        setContactData={setContactData}
        searchEmail={searchEmail}
        setSearchEmail={setSearchEmail}
        checked={checked}
        setChecked={setChecked}
      />
    </>
  );
};

export default Home;
