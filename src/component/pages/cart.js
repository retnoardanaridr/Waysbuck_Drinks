import React, { useState, useEffect } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';
import Navibar from './navbar';
import trash from '../../assets/trash.png';

function Cart() {
    let navigate = useNavigate();

    //fetching data from db
    let { data: cart, refetch } = useQuery("cartsCache", async () => {
        const response = await API.get("/carts");
        return response.data.data;
    });

    console.log(cart)
    

    let price = 0;
    cart?.map((element) => (
        price += element.price
    ))

    // payment condition
    const form = {
        total: price,
    };
    console.log(price)

    const handleDelete = async (id) => {
        await API.delete(`/cart/` + id);
        refetch();
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const response = await API.post('/transaction', price);
            console.log("SUCCESS", response.data.data);
        } catch (error) {
            console.log(error);
        }

        // insert transaction 
        const body = JSON.stringify(form);
        const response = await API.patch('/transaction', body);
        const token = response.data.data.token;

        window.snap.pay(token, {
            onSuccess: function (result) {
                console.log(result);
                navigate('/profile');
            },
            onPending: function (result) {
                console.log(result);
                navigate('/profile');
            },
            onError: function (result) {
                console.log(result);
            },
            onClose: function () {
                alert("you closed the popup without finishing the payment")
            },
        });
        await API.patch('/cart', body)
    })

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);



    return (
        <>
            <Navibar addCart={cart?.length} />
            <div>
                <Container>
                    <div className="mb-4 col-8 pe-5">
                        <div className="border-bottom border-1 border-dark">
                            <h3 className="fw-bolder fs-2 mb-4 text-danger">My Cart</h3>
                            <h6 className="fw-semibold fs-5 mb-3 text-danger">Review Your Order</h6>
                        </div>
                        <div className="border-bottom border-1 border-dark pt-2 pb-2">
                            {cart?.map((data, index) => (
                                <div key={index} className="row mt-2 mb-4">
                                    <div className="col-2">
                                        <div className="w-100">
                                            <Image className="w-100" alt={data.product.title} src={data?.product?.image} />
                                        </div>
                                    </div>
                                    <div className="col-8 pe-0">
                                        <p className="text-danger fw-bolder fs-5">{data.product.title}</p>
                                        <div className="row">
                                            <p className="col-2 fw-bold pe-0" style={{ color: "#984c4c" }}>Toping :</p>
                                            <div className="col-9 ps-0">
                                                {data.toppings?.map((topping, index) => (
                                                    <span key={index} className="fw-semibold fs-6 text-danger">{topping.title}, </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2 d-grid">
                                        <p className="text-end fw-semibold text-danger">{data.product.price}</p>
                                        <Image
                                            className="ms-auto"
                                            width="26" style={{ cursor: "pointer" }}
                                            src={trash}
                                            alt=""
                                            onClick={() => handleDelete(data.id)}
                                        />

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="">
                            <div className="d-flex mt-4 mb-2 text-danger fw-semibold">
                                <div className="col-7 pe-4 pt-3">
                                    <div className="border-top border-bottom border-1 border-dark">
                                        <div className="d-flex pt-3">
                                            <p className="col-6 text-start">Subtotal</p>
                                            <p className="col-6 text-end">Rp {price}</p>
                                        </div>
                                        <div className="d-flex pb-1">
                                            <p className="col-6 text-start">Qty</p>
                                            <p className="col-6 text-end">{cart?.length}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex pt-3 fw-bolder">
                                        <p className="col-6 text-start">Total</p>
                                        <p className="col-6 text-end">Rp. {price}</p>
                                    </div>
                                </div>

                                <Button variant="danger" type="submit" className="w-100 h-100 add-cart" onClick={(e) => handleSubmit.mutate(e)} >
                                    Pay
                                </Button>
                            </div>
                        </div>
                    </div>

                </Container>
            </div>
        </>
    )
}

export default Cart;