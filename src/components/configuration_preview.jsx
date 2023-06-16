import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
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
            {Selected_Items.map((item, index) => (
                <Container fluid key={index}>
                    <Row>
                        <Col xs={6}>
                            {item.Description}
                            <Button variant="danger" onClick={() => deleteItem(index)}>Delete</Button>
                        </Col>
                    </Row>
                </Container>
            ))}
        </div>
    );
};

export default DisplaySelectedItems;
