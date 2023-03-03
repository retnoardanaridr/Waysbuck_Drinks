import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../../contexts/userContext';
import FormLogin from '../auth/login';
import FormRegister from '../auth/register';



function MenuProducts() {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext);
    const [showLogin, setShowLogin] = useState();
    const [showRegister, setShowRegister] = useState();


    //fetching product frm db
    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });

    const goDetail = (id) => {
        navigate('/product' + id)
    }

    useEffect(() => {
        if (state.isLogin === true) {
            setShowLogin(false)
            setShowRegister(false)
        }
    }, [state.isLogin])

    return (
        <>
            <section style={{ color: 'red', marginLeft: '125px' }}>
                <h2>Let's Order</h2>
                <ul className="row row-cols-5 d-flex flex-wrap">
                    {products?.map((data, id) => (
                        <>
                            <div key={id} className="card col m-4" style={{ backgroundColor: '#f6dada' }}>
                                {state.isLogin ? (
                                    <>
                                        <img className='w-100' src={data?.image} alt="product" onClick={() => goDetail(data?.id)} />
                                        <div className="">
                                            <h6 className="fw-bold">{data?.title}</h6>
                                            <p>Rp. {data?.price}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <img className='w-100' src={data?.image} alt='product' onClick={() => setShowLogin(true)} />
                                        <div className="">
                                            <h6 className="fw-bold">{data?.title}</h6>
                                            <p>Rp. {data?.price}</p>
                                        </div>
                                    </>
                                )}
                            </div>
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
                        </>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default MenuProducts;