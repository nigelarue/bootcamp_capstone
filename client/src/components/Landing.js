import React from "react";
import "./Landing/Landing.css";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import App from "../App";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import image from "../assets/comet.png";

function Landing() {

  const styles = {
    buttonContainer: {
      display: "flex",
      width: "50%",
      marginLeft: "10%"
    },
    button: {
      width: "150px",
      padding: "10px",
      margin: "5px",
      borderRadius: "50px",
      backgroundColor: "#b83d22",
      border: "none",
      outline: "none",
      cursor: "pointer"
    }
  };

  return (
    <div className="style__landing-title flex-row">
      <div className="orbital__landing-container">
        <h3 className="gradient__text"><em><i>Rendezvous with Local Service Providers</i></em></h3>
        <div className="style__landing-content">
          <p>A <b>space rendezvous</b> refers to the precise matching of speed and position between a spacecraft and its destination, such as a satellite or space station. What if there was a convenient and efficient way to schedule appointments and <i>"rendezvous"</i> with your local service providers?
          <br></br>
          <br></br> 
          Try <em><b>Orbital Scheduler</b></em>, the ultimate scheduling app that gives you access to a network of registered service providers. With a few taps, you can easily book appointments with your preferred provider and save them in your personal profile for easy access. Say goodbye to the hassle of juggling multiple calendars and schedules. Get organized and book your appointments today with Orbital Scheduler!</p>
        </div>
        <div style={styles.buttonContainer}>
          <a href="/signup">
            <Button style={styles.button}>Sign Up</Button>
          </a>
          <a href="/login">
            <Button style={styles.button} >Log In</Button>
          </a>
        </div>
     </div>
     <img style={{ position: "flex", right: 0 }} className="flex-row" src={image} alt="An image of a comet" />
    </div>
  );
}


export default Landing;
