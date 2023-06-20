import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Selected_Items_Context, Items_Lenght_Check_Context } from '../selected_items_context.jsx';


const DisplaySelectedItems = () => {
    const { Selected_Items, set_Selected_Items } = useContext(Selected_Items_Context);
    const {Length_Limit_Check, setLength_Limit_Check} = useContext(Items_Lenght_Check_Context);

    const deleteItem = (indexToDelete) => {
        const itemToDelete = Selected_Items[indexToDelete];
        setLength_Limit_Check(Length_Limit_Check - itemToDelete['Size'])
        const newSelectedItems = Selected_Items.filter((element, index) => index !== indexToDelete);
        set_Selected_Items(newSelectedItems);
    };  

    return (
        <div>
            <ListGroup>
                <ListGroup.Item>
                    <h2>Currently selected: </h2>
                </ListGroup.Item>
                {Selected_Items.map((item, index) => (
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                {item.Description}
                            </Col>    
                            <Col>
                                <Button variant="danger" onClick={() => deleteItem(index)}>Delete</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default DisplaySelectedItems;
