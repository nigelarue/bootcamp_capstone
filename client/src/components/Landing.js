import React from "react";
import "./Landing/Landing.css";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import App from "../App";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Landing() {


  return (
    <div className="style__landing-title flex-row space-between">
      <h3 className="gradient__text style__landing-hdr">APP DESCRIPTION DON'T FORGET</h3>
      <a href="/signup">
        <Button className="style__landing-btn">Sign Up</Button>
      </a>
      <a href="/login">
        <Button className="style__landing-btn">Log In</Button>
      </a>
    </div>
  );
}


export default Landing;
