import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, Button, Dropdown, Image, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormLogin from '../auth/login';
import FormRegister from '../auth/register';
import logo from '../../assets/logo.png'
import basket from '../../assets/cartIcon.png';
import user from '../../assets/profile.png';
import logout from '../../assets/logout.png'
import { UserContext } from '../../contexts/userContext';
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import MyProfile from './myProfile';
import NavAdmin from './navLogin';
import NavLogin from './navLogin';



const style = {
    button: {
        width: "120px",
    }
}


function Navibar() {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext);
    const [showLogin, setShowLogin] = useState();
    const [showRegister, setShowRegister] = useState();
    // const [adminDropdown, setAdminDropdown] = useState(false);
    // const [userDropdown, setUserDropdown] = useState(false);

    function Logout() {
        dispatch({ type: 'LOGOUT' })
    }

    // const { data: cart } = useQuery('cartsCache', async () => {
    //     const response = await API.get('/carts');
    //     return response.data.Data;
    // })

    useEffect(() => {
        // value state from usercontext
        if (state.isLogin === true) {
            setShowLogin(false)
            setShowRegister(false)
        }
    }, [state.isLogin])

    return (
        <>
            {['md'].map((expand) => (
                <Navbar key={expand} bg="white" expand={expand} className="mb-3 ">
                    <Container>
                        <Navbar.Brand>
                            <Link to="/"><img
                                alt=""
                                src={logo}
                                width="80"
                                height="80"
                                className="d-inline-block align-top"
                            /></Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Side Bar
                                    <hr />
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {state.isLogin ? (
                                    
                                    <NavLogin />
                                            // <>
                                            //     <Nav className='ms-auto'>
                                            //         <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }}>
                                            //             <>
                                            //                 <Image src={basket} width='40px' height='40px' onClick={() => navigate("/cart")} />
                                            //                 <Badge bg='danger' pill style={{ height: '25px', width: '25px' }} className='d-flex align-items-center justify-content-center fs-6 position-absolute ms-4'>

                                            //                 </Badge>
                                            //             </>
                                            //             <Dropdown>

                                            //                 <Dropdown.Toggle variant='' id='dropdown-basic'>
                                            //                     <Image src={user} width='45px' height='45px' className='rounded-pill' />
                                            //                 </Dropdown.Toggle>

                                            //                 <Dropdown.Menu>
                                            //                     <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                            //                         <Link to={'/profile'}
                                            //                             className='text-dark text-decoration-none d-flex gap-2'
                                            //                         > <Image src={user} width='25px' /> Profile
                                            //                         </Link>
                                            //                     </Dropdown.Item>
                                            //                     <Dropdown.Item
                                            //                         className='d-flex gap-2 align-items-center'
                                            //                         style={{ height: '50px' }}
                                            //                         onClick={() => {
                                            //                             Logout();

                                            //                         }}
                                            //                     ><Image src={logout} width='25px' />
                                            //                         Logout
                                            //                     </Dropdown.Item>
                                            //                 </Dropdown.Menu>
                                            //             </Dropdown>
                                            //         </div>
                                            //     </Nav>

                                            // </>

                                     ) : (
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Button onClick={() => setShowLogin(true)} variant='outline-danger' className='me-3 py-1 border border-3 border-danger fw-bold' style={style.button}>Login</Button>
                                        <Button onClick={() => setShowRegister(true)} variant='outline-danger' className='py-1 border border-3 border-danger fw-bold' style={style.button}>Register</Button>
                                    </Nav>
                                )}

                                <FormLogin
                                    show={showLogin}
                                    setShow={setShowLogin}
                                    setShowRegister={setShowRegister}
                                />
                                <FormRegister
                                    show={showRegister}
                                    setShow={setShowRegister}
                                    setShowLogin={setShowLogin}
                                />

                                {/* <NavAdmin
                                    adminDropdown={adminDropdown}
                                    userDropdown={userDropdown}
                                    Logout={Logout} /> */}

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

export default Navibar;
