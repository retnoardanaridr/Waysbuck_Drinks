import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../auth/register.css';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from 'react-query';
import { API } from '../../config/api';



function FormRegister({ show, setShow, setShowLogin }) {
    const [message, setMessage] = useState(null);
    const [userRegis, setUserRegis] = useState({
        email: '',
        password: '',
        fullname: ''
    })

    const handleChange = (e) => {
        setUserRegis({
            ...userRegis,
            [e.target.name]: e.target.value,
        })
    }

    const handleOnClick = useMutation(async (e) => {
        try {
            e.preventDefault();
            // Configuration Content-type
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            // Data body
            const body = JSON.stringify(userRegis);

            //insert data user to db
            const response = await API.post('/register', body, config)
            
            const alert = (
                <Alert variant='success' className='py-1'>
                    Success
                </Alert>
            )
            setMessage(alert)
            setShowLogin(true)
            console.log("data berhasil ditambahkan", response.data.data)
        } catch (err) {
            const alert = (
                <Alert variant='danger' className='py-1'>
                    Failed
                </Alert>
            )
            setMessage(alert)
            console.log(err)
        }
    })


    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} centered>
                <form>
                    <div className='modalBackground'>
                        <div className='modalCardRegis'>
                            <div className='titleREGIS'>
                                <h2>REGISTER</h2>
                            </div>
                            {message && message}
                            <div className='inputEmail'>
                                <input name='email' onChange={handleChange} value={userRegis.email} type='email' placeholder='Input Email' />
                            </div>
                            <div className='inputPassword'>
                                <br />
                                <input name='password' onChange={handleChange} value={userRegis.password} type='password' placeholder='Input Password' />
                            </div>
                            <div>
                                <br />
                                <input name='fullname' onChange={handleChange} value={userRegis.fullname} type='text' placeholder='Fullname' />
                            </div>
                            <br />
                            <div className='d-grid gap-2'>
                                <Button onClick={(e) => handleOnClick.mutate(e)} variant="danger">Sign Up</Button>
                            </div>
                            <p>Already Have an Account? Click {' '}
                                <span
                                    style={{ cursor: 'pointer' }}
                                    className='text-primary'
                                    onClick={() => {
                                        setShow(false);
                                        setShowLogin(true);
                                    }}>
                                    Here
                                </span>
                            </p>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default FormRegister;