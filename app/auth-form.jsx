"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import {
  Alert,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Accordion,
} from "react-bootstrap";

export default function AuthForm() {
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  //   const handleSignIn = async () => {
  //     setLoading(true);
  //     const { error } = await supabase.auth.signInWithOtp({ email: signInEmail });

  //     if (error) {
  //       setMessage(error.error_description || error.message)
  //     } else {
  //       setMessage("Check your email for the login link!")
  //     }
  //     setLoading(false);
  //   };

  //   const handleSignUp = async () => {
  //     setLoading(true);
  //     const { data, error } = await supabase.auth.signUp({
  //       email: signUpEmail,
  //       password: signUpPassword,
  //     });

  //     if (error) {
  //       setMessage(error.error_description || error.message)
  //     } else {
  //       setMessage("Check your email for the login link!")
  //     }
  //     setLoading(false);
  //   };
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <h1 className="header">Curntly Configurator</h1>
        </ListGroup.Item>

        <ListGroup.Item>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h2 className="header">SignIn</h2>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <p className="description">
                      Sign in via magic link, just enter your email below and
                      click on the link inside it
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      {/* <Col>
                        <Form className="w-50">
                          <Form.Group controlId="email">
                            <Form.Control
                              type="email"
                              placeholder="Your email"
                              value={signInEmail}
                              required={true}
                              onChange={(e) => setSignInEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Col>
                      <Col>
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="w-25"
                          disabled={loading}
                          onClick={handleSignIn}
                        >
                          {loading ? (
                            <span>Loading</span>
                          ) : (
                            <span>Send magic link</span>
                          )}
                        </Button>
                      </Col> */}
                      <Auth
                        supabaseClient={supabase}
                        view="magic_link"
                        appearance={{ theme: ThemeSupa }}
                        theme="dark"
                        showLinks={false}
                        providers={[]}
                        redirectTo="http://localhost:3000/auth/callback"
                      />
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </ListGroup.Item>

        {/* <ListGroup.Item>
          <h3 className="header">OR...</h3>
        </ListGroup.Item>

        <ListGroup.Item>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h2 className="header">SignUp</h2>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <p className="description">
                      Sign up here with your email address
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Form className="w-50">
                          <Form.Group controlId="email">
                            <Form.Control
                              type="email"
                              placeholder="Your email"
                              value={signUpEmail}
                              required={true}
                              onChange={(e) => setSignUpEmail(e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group controlId="password">
                            <Form.Control
                              type="password"
                              placeholder="Your password"
                              value={signUpPassword}
                              required={true}
                              onChange={(e) =>
                                setSignUpPassword(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Form>
                      </Col>
                      <Auth
                        supabaseClient={supabase}
                        view="magic_link"
                        appearance={{ theme: ThemeSupa }}
                        theme="dark"
                        showLinks={false}
                        providers={[]}
                        redirectTo="http://localhost:3000/auth/callback"
                      />
                      <Col>
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="w-25"
                          disabled={loading}
                          onClick={handleSignUp}
                        >
                          {loading ? (
                            <span>Loading</span>
                          ) : (
                            <span>Sign Up</span>
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </ListGroup.Item> */}
        {message === false ? <></> : <Alert variant={"info"}>{message}</Alert>}
      </ListGroup>
    </>
  );
}
