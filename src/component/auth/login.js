import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import '../auth/login.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { Alert } from 'react-bootstrap';


function FormLogin({show, setShow, setShowRegister }) {
    let navigate = useNavigate();

    const [ state, dispatch ] = useContext(UserContext);
    const [ message, setMessage ] = useState(null);
    const [ userLogin, setUserLogin ] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value,
        })
    }
    const handleOnClick  = useMutation(async (e) => {
        // console.log("test")
        try {
            e.preventDefault();

            // insert data useer to db 
            const response = await API.post('/login', userLogin)
            console.log(response.data.data);

            const alert = (
                <Alert variant='success' className='py-1'>
                    Success
                </Alert>
            )
            setMessage(alert)
            console.log("test")
            console.log(response)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data
            })
            navigate('/')
            console.log(response.data.data)
        } catch (err) {
            const alert = (
                <Alert variant='danger' className='py-1'>
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(err)
        }
    })

    return(
        <>
            <Modal show={show} onHide={() => setShow(false)} centered>
                <form>
                    <div className='modalBackground'>
                        <div className='modalCard'>
                            <div className='titleLogin'>
                                <h2>LOGIN</h2>
                            </div>
                            {message && message}
                            <div className='inputEmail'>
                                <input name='email' value={userLogin.email} onChange={handleChange} type='email' placeholder='Input Email' />
                            </div>
                            <div className='inputPassword'>
                                <br/>
                                <input name='password' value={userLogin.password} onChange={handleChange} type='password' placeholder='Input Password' />
                            </div>
                            <div className='d-grid gap-2'>
                                <br/>
                                <Button onClick={(e) => handleOnClick.mutate(e)} variant="danger">Sign In</Button>
                            </div>
                                <p>Don't Have an Account? Click {' '}
                                <span 
                                style={{ cursor: "pointer" }}
                                className='text-primary'
                                onClick={() => {
                                setShow(false);
                                setShowRegister(true);
                                }}>Here
                                </span>
                                </p>
                        </div>
                    </div> 
                </form>
            </Modal> 
        </>
    )
}

export default FormLogin;