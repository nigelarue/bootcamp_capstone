import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import "./Navbar/Navbar.css";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

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
              Bootcamp-Capstone
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
              <Nav className="ml-auto">
                {/* if user is logged in show saved books and logout */}
                {Auth.loggedIn() ? (
                  <>
                    {Auth.getProfile().data.isProvider ? (
                      <Nav.Link as={Link} to="/provider">
                        Provider
                      </Nav.Link>
                    ) : (
                      <Nav.Link as={Link} to="/user">
                        User
                      </Nav.Link>
                    )}

                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup">
                      Signup
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
