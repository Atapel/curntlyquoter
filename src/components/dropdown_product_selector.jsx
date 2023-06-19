import React, { useContext, useState } from 'react';
import { Dropdown, Button, Navbar, Nav } from 'react-bootstrap';
import {Single_breakers_46,Single_breakers_36, Double_breakers_46, Double_breakers_36} from '../api_requests/fetch_products.jsx';
import { Selected_Items_Context, Items_Lenght_Check_Context } from '../selected_items_context.jsx';

const Select_Breakers_Menu = () => {
    const {Selected_Items, set_Selected_Items} = useContext(Selected_Items_Context);
    const {Length_Limit_Check, setLength_Limit_Check} = useContext(Items_Lenght_Check_Context);
    const [Warning_Display, setWarning_Display] = useState(false)

    const [Selected_Frame_Size, setSelected_Frame_Size] = useState('Select Frame Size')
    const [Selected_Voltage, setSelected_Voltage] = useState('Select Voltage')
    const [Selected_KAIC_rating, setSelected_KAIC_rating] = useState('Select KAIC Rating') 
    const [Selected_Breaker_Size, setSelected_Breaker_Size] = useState('Select Breaker Size')
    const [Currently_Selected_Breaker, setCurrently_Selected_Breaker] = useState({Description:'Select Breaker'})
    const [Selected_Bus_rating, setSelected_Bus_rating] = useState('Select Bus Rating') 

    const handleProductSelect = (product) => {
        if (Length_Limit_Check + product['Size'] <= 45) {
            // Append selected specs to selected item
            product.config_specs = {
                'Voltage': Selected_Voltage,
                'KAIC_rating': Selected_KAIC_rating,
                'Bus_rating': Selected_Bus_rating

            }
            // Implement Nomenclature
            if(Selected_Voltage === '208Y/120V'){
                if(Selected_KAIC_rating === 65){
                    product.Description = product.Description+'N'
                }else if(Selected_KAIC_rating === 100){
                    product.Description = product.Description+'H' 
                }else if(Selected_KAIC_rating === 150){
                    product.Description = product.Description+'L' 
                }
            }else if(Selected_Voltage === '480Y/270V'){
                if(Selected_KAIC_rating === 35){
                    product.Description = product.Description+'N'
                }else if(Selected_KAIC_rating === 65){
                    product.Description = product.Description+'H' 
                }else if(Selected_KAIC_rating === 100){
                    product.Description = product.Description+'L' 
                }
            }
            

            set_Selected_Items(prevItems => [...prevItems, product]);
            setLength_Limit_Check(Length_Limit_Check + product['Size'])
            setWarning_Display(false)

            // reset the states back to original, but keep the Frame Size
            setSelected_Voltage('Select Voltage');
            setSelected_KAIC_rating('Select KAIC Rating');
            setSelected_Breaker_Size('Select Breaker Size');
            setCurrently_Selected_Breaker({Description:'Select Breaker'});
            setSelected_Bus_rating('Select Bus Rating');
        } else {
            setWarning_Display(true)
        }
    };
    
    

    let products = []
    if (Selected_Breaker_Size == 'Single' && Selected_Frame_Size === 46) {
        products = Single_breakers_46
    } else if(Selected_Breaker_Size == 'Single' && Selected_Frame_Size === 36) {
        products = Single_breakers_36
    } else if(Selected_Breaker_Size == 'Double' && Selected_Frame_Size === 46) {
        products = Double_breakers_46
    }else if(Selected_Breaker_Size == 'Double' && Selected_Frame_Size === 36) {
        products = Double_breakers_36
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        
                        {/*  Selection for Voltage */}
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {Selected_Frame_Size}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_Frame_Size(36)}>
                                        36
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_Frame_Size(46)}>
                                        46
                                    </Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/*  Selection for Voltage */}
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" disabled={Selected_Frame_Size === 'Select Frame Size'}>
                                {Selected_Voltage}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_Voltage('208Y/120V')}>
                                        208Y/120V
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_Voltage('480Y/270V')}>
                                        480Y/270V 
                                    </Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/*  Selection for KAIC rating */}
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" disabled={Selected_Voltage === 'Select Voltage'}>
                                {Selected_KAIC_rating}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {Selected_Voltage === '208Y/120V' ? (
                                    <Dropdown.Item>
                                        <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_KAIC_rating('35')}>
                                            35
                                        </Button>
                                    </Dropdown.Item>
                                ) : Selected_Voltage === '480Y/270V' ? (
                                    <>
                                        <Dropdown.Item>
                                            <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_KAIC_rating('65')}>
                                                65 
                                            </Button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_KAIC_rating('100')}>
                                                100
                                            </Button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_KAIC_rating('150')}>
                                                150 
                                            </Button>
                                        </Dropdown.Item>
                                    </>
                                ) : null}
                            </Dropdown.Menu>
                        </Dropdown>


                        {/*  Selection for Breaker Size */}
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" disabled={Selected_KAIC_rating === 'Select KAIC Rating'}>
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
                        
                        {/* Selection for Breaker */}
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" disabled={Selected_Breaker_Size === 'Select Breaker Size'}>
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

                        {/*  Selection for Bus rating */}
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" disabled={Currently_Selected_Breaker.Description === 'Select Breaker'}>
                                {Selected_Bus_rating}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_Bus_rating('750A')}>
                                        750A
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_Bus_rating('1500A')}>
                                        1500A
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button variant="outline-info" size="sm" className="w-100" onClick={() => setSelected_Bus_rating('2250A')}>
                                        2250A
                                    </Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        
                        {/* Add Breaker to Preview */}
                        <Button variant="outline-info" size="sm" className="w-100" onClick={() => handleProductSelect(Currently_Selected_Breaker)} disabled={Selected_Bus_rating === 'Select Bus Rating' || Length_Limit_Check > 45}>
                            Add
                        </Button>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    );
};

export default Select_Breakers_Menu;
