"use client"
import { useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  Dropdown,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
} from "react-bootstrap";

function Saved_Configurations() {
  const supabase = createClientComponentClient()
  const [configs, setConfigs] = useState([]);

  async function getConfigs() {
    try {
      const { data, error } = await supabase.from("Configurations").select();
      if (error) {
        throw new Error("Failed to retrieve data from the database.");
      }
      setConfigs(data);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getConfigs();
  }, []);

  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <h2>Previous configurations</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            {configs.map((configuration) => (
              <>
                <Card style={{ width: "18rem" }} key={configuration.id}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>{configuration.init_project}</Card.Title>
                    <ListGroup>
                      <ListGroupItem>{configuration.created_at}</ListGroupItem>
                      <ListGroupItem>{configuration.init_client}</ListGroupItem>
                    </ListGroup>
                    <Button variant="primary">Expand... </Button>
                    {/* <Button variant="primary">Load Configuration</Button> */}
                  </Card.Body>
                </Card>
              </>
            ))}
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

export default Saved_Configurations;
