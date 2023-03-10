import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import "./Navbar/Navbar.css";
import { GiOrbital } from "react-icons/gi";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import BookingForm from "./BookingForm";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="style__navbar">
        <Navbar className="gradient__bg" expand="lg">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <p className="style__navbar-brand"><GiOrbital /> Orbital Scheduler</p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
              <Nav className="ml-auto">
                {/* if user is logged in show saved appts and logout */}
                {Auth.loggedIn() ? (
                  <>
                    {Auth.getProfile().data.isProvider ? (
                      <Nav.Link as={Link} to="/provider">
                        <p className="style__navbar-links">Provider</p>
                      </Nav.Link>
                    ) : (
                      <>
                      <Nav.Link as={Link} to="/BookingForm">
                        <p className="style__navbar-links">Book an Appointment</p>
                      </Nav.Link>                       
                      <Nav.Link as={Link} to="/user">
                        <p className="style__navbar-links">User</p>
                      </Nav.Link>
                      </>                     
                    )}

                    <Nav.Link onClick={Auth.logout}><p className="style__navbar-links">Logout</p></Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">
                    <p className="style__navbar-links-srvc-prvdrs">Catalog of our Service Providers</p>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                      <p className="style__navbar-links-lgn">Login</p>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup">
                      <p className="style__navbar-links-sgnup">Signup</p>
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* set modal data up */}
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="signup-modal"
        >
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="login">
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <SignUpForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </div>
    </>
  );
};

export default AppNavbar;
