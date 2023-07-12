import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { Form, Button, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <h1 className="header">Curntly Configurator</h1>
        </ListGroup.Item>
        <ListGroup.Item>
          <p className="description">
            Sign in via magic link, just enter your email below and click on the link inside it
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
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
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
                onClick={handleLogin}
              >
                {loading ? (
                  <span>Loading</span>
                ) : (
                  <span>Send magic link</span>
                )}
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
