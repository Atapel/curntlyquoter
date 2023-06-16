import React, { useContext, useState } from 'react';
import { Dropdown, Button, Navbar, Nav } from 'react-bootstrap';
import products from '../api_requests/fetch_products.jsx';
import { Selected_Items_Context, Items_Lenght_Check_Context } from '../selected_items_context.jsx';

const Select_Breakers_Menu = () => {
    const {Selected_Items, set_Selected_Items} = useContext(Selected_Items_Context);
    const {Length_Limit_Check, setLength_Limit_Check} = useContext(Items_Lenght_Check_Context);
    const [Warning_Display, setWarning_Display] = useState(false)

    const handleProductSelect = (product) => {
        if (Length_Limit_Check + product['Size'] <= 45) {
            set_Selected_Items(prevItems => [...prevItems, product]);
            setLength_Limit_Check(Length_Limit_Check + product['Size'])
            setWarning_Display(false)
        } else {
            setWarning_Display(true)
        }
    };

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Please Select Breakers
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {products.map((product, index) => (
                                    <Dropdown.Item key={index}>
                                        <Button variant="outline-info" size="sm" className="w-100" onClick={() => handleProductSelect(product)} disabled={Length_Limit_Check > 45}>
                                            {product.Description}
                                        </Button>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* {Warning_Display ? <p>Max Number of Breakers Selected</p> : <div></div>} */}
        </div>
    );
};

export default Select_Breakers_Menu;
