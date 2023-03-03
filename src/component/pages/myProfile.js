import React from 'react';
import { Stack, Container, Col, Row } from 'react-bootstrap';
import profile from '../../assets/profile.png';
import Image from '../../assets/menu/menu1.png';
import Navibar from './navbar';
import NavLogin from './navLogin';

function MyProfile () {

    return (
        <>
            <Navibar />
            <Stack direction="horizontal" gap={3}>
            <div>
                <Container>
                <Row>
                    <Col className="profil">
                    <p>My Profile</p>
                    <Stack direction="horizontal" gap={4}>
                    <div>
                    <img src={profile} alt=""/>
                    </div>
                    <div className="align-self-start">
                    <p className="fw-bold my-0" style={{color: "#613D2B"}}>Full Name</p>
                    <p className="mb-4">Jojo</p>
                    <p className="fw-bold my-0" style={{color: "#613D2B"}}>Email</p>
                    <p className="mb-4">Jojo@stardust.com</p>
                    </div>
                    </Stack>
                    </Col>

                    <Col className="transaction">
                    <p>My Transaction</p>
                    <Stack direction="horizontal" gap={4} style={{backgroundColor: "#F7DADA", borderRadius: "10px"}}>
                            <div>
                                <Stack direction="horizontal" gap={3} className="pt-4 pb-1 px-4">
                                    <div>
                                        <img src={Image} alt=""></img>
                                    </div>

                                    <div className="align-self-start">
                                    <p className="fw-bold mb-0" style={{color: "#BD0707", fontSize: "14px"}}>Ice Coffe Palm Sugar</p>
                                    <p className="my-1" style={{color: "#BD0707", fontSize: "9px"}}><b>Saturday,</b> 5 March 2020</p>
                                    <p className="mt-3 mb-1" style={{color: "#BD0707", fontSize: "9px"}}><span>Toping : </span>Bill Berry Boba, Bubble Tea Gelatin</p>
                                    <p className="mt-2" style={{color: "#BD0707", fontSize: "9px"}}><span>Price : </span>Rp.33.000</p>
                                    </div>
                                </Stack>
                            </div>

                            {/* <div className="align-self-start p-4">
                                <img src={logo} alt="" className="ms-4 d-flex justify-content-end" style={{ width: "47px"}}></img>
                                <img src={barcode} alt="" className="pt-4 ms-3 d-flex justify-content-end"></img>
                                <p className="p-2 bg-info mt-2 ms-3" style={{color: "blue", fontSize: "9px", width: "75px"}}>On The Way</p>
                                <p className="mt-2 fw-bold d-flex justify-content-end" style={{color: "#BD0707", fontSize: "12px"}}><span>Sub Total :</span> 69.000</p>
                            </div> */}

                    </Stack>   
                    </Col>

                </Row>
                </Container>
            </div>
        </Stack>
        </>
    )
}

export default MyProfile;