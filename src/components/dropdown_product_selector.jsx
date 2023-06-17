import React, { useContext, useState } from 'react';
import { Dropdown, Button, Navbar, Nav } from 'react-bootstrap';
import {Single_breakers, Double_breakers} from '../api_requests/fetch_products.jsx';
import { Selected_Items_Context, Items_Lenght_Check_Context } from '../selected_items_context.jsx';

const Select_Breakers_Menu = () => {
    const {Selected_Items, set_Selected_Items} = useContext(Selected_Items_Context);
    const {Length_Limit_Check, setLength_Limit_Check} = useContext(Items_Lenght_Check_Context);
    const [Warning_Display, setWarning_Display] = useState(false)
    const [Selected_Breaker_Size, setSelected_Breaker_Size] = useState('Please Select Breaker Size')
    const [Currently_Selected_Breaker, setCurrently_Selected_Breaker] = useState({Description:'Please Select Breaker'})

    const handleProductSelect = (product) => {
        if (Length_Limit_Check + product['Size'] <= 45) {
            set_Selected_Items(prevItems => [...prevItems, product]);
            setLength_Limit_Check(Length_Limit_Check + product['Size'])
            setWarning_Display(false)
        } else {
            setWarning_Display(true)
        }
    };

    let products = Single_breakers
    if (Selected_Breaker_Size == 'Singe') {
        products = Single_breakers
    } else if(Selected_Breaker_Size == 'Double'){
        products = Double_breakers
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {Selected_Breaker_Size}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_Breaker_Size('Single')}>
                                            Single
                                        </Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_Breaker_Size('Double')}>
                                            Double
                                        </Button>
                                    </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {Currently_Selected_Breaker.Description}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {products.map((product, index) => (
                                    <Dropdown.Item key={index}>
                                        <Button variant="outline-info" size="sm" className="w-100" onClick={() => setCurrently_Selected_Breaker(product)} disabled={Length_Limit_Check > 45}>
                                            {product.Description}
                                        </Button>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        
                        <Button variant="outline-info" size="sm" className="w-100" onClick={() => handleProductSelect(Currently_Selected_Breaker)} disabled={Length_Limit_Check > 45}>
                            Add {Currently_Selected_Breaker.Description}
                        </Button>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* {Warning_Display ? <p>Max Number of Breakers Selected</p> : <div></div>} */}
        </div>
    );
};

export default Select_Breakers_Menu;
