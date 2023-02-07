import React from "react";
import { Button } from "reactstrap";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Landing() {
  return (
    <div className="flex-row space-between">
      <h3>APP DESCRIPTION DON'T FORGET</h3>
      <Button onClick={() => window.location.assign("/signup")}>Sign Up</Button>
      <Button onClick={() => window.location.assign("/login")}>Log In</Button>
    </div>
  );
}

export default Landing;
