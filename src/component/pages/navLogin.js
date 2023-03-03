import React, { useContext, useEffect } from "react";
import { Nav, Dropdown, Image, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import product from '../../assets/drink.png';
import topping from '../../assets/toping.png';
import logout from '../../assets/logout.png'
import user from '../../assets/profile.png';
import basket from '../../assets/cartIcon.png';
import { UserContext } from '../../contexts/userContext';
import Navibar from "./navbar";
import { useQuery } from "react-query";
import { API } from "../../config/api";



function NavLogin() {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext);

    //fecthing cart
    let { data: cart, refetch } = useQuery('cartsCache', async () => {
        const response = await API.get('/carts');
        return response.data.data;
    });

    function Logout() {
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        refetch();
    }, [])
    return (

        <>
            {state.user.role === "admin" ? (

                <Nav className='ms-auto'>
                    <Dropdown>
                        <Dropdown.Toggle variant='' id='dropdown-basic'>
                            <Image src={user} width='45px' height='45px' className='rounded-pill' />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                <Link to={'/add-product'}
                                    className='text-dark text-decoration-none d-flex gap-2'
                                > <Image src={product} width='25px' /> Add Product
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                <Link to={'/add-topping'}
                                    className='text-dark text-decoration-none d-flex gap-2'
                                > <Image src={topping} width='25px' /> Add Topping
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                <Link to={'/transaction'}
                                    className='text-dark text-decoration-none d-flex gap-2'
                                > <Image src={user} width='25px' /> Transaction
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item
                                className='d-flex gap-2 align-items-center'
                                style={{ height: '50px' }}
                                onClick={() => {
                                    Logout();

                                }}
                            ><Image src={logout} width='25px' />
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>


            ) : (
                <Nav className='ms-auto'>
                    <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }}>
                        <>
                            <Image src={basket} width='40px' height='40px' onClick={() => navigate("/cart")} />
                            <Badge bg='danger' pill style={{ height: '25px', width: '25px' }} className='d-flex align-items-center justify-content-center fs-6 position-absolute ms-4'>
                                {(cart?.length >= 1) && <span>{cart?.length}</span>}
                            </Badge>
                        </>
                        <Dropdown>

                            <Dropdown.Toggle variant='' id='dropdown-basic'>
                                <Image src={user} width='45px' height='45px' className='rounded-pill' />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                    <Link to={'/profile'}
                                        className='text-dark text-decoration-none d-flex gap-2'
                                    > <Image src={user} width='25px' /> Profile
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className='d-flex gap-2 align-items-center'
                                    style={{ height: '50px' }}
                                    onClick={() => {
                                        Logout();

                                    }}
                                ><Image src={logout} width='25px' />
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Nav>
            )}
        </>
    )
}

export default NavLogin;