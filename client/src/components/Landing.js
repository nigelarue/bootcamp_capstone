import React from "react";
import { Button } from "reactstrap";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


function Landing(props) {
    const {
        setCurrentPage,
    } = props;

    return (
 
        <div className="flex-row space-between">
            <h3>APP DESCRIPTION DON'T FORGET</h3>
            <Button 
            onClick={() => setCurrentPage(SignupForm)}>Sign Up</Button>
            <Button 
            onClick={() => setCurrentPage(LoginForm)}>Log In</Button>
        </div>
    );
}

export default Landing;

