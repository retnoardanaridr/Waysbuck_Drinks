import React, { useContext, useEffect, useState } from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../../contexts/userContext';
import Navibar from './navbar';


function DetailProduct() {
    const navigate = useNavigate()
    // const [ state, dispacth ] = useContext(UserContext)
    // const [ totalPrice, setTotalPrice ] = useState();

    const { id } = useParams();

    // fetch product
    const { data: product } = useQuery('productCache', async () => {
        const response = await API.get(`/product/${id}`)
        return response.data.data;
    });

    // fetching topping frm db
    const { data: toppings } = useQuery('toppingsCache', async () => {
        const response = await API.get('/toppings')
        return response.data.data;
    })

    //price total
    let price = toppings?.map((item) => item.price)
    let resultTotal = price?.reduce((a, b) => a + b, 0)

    let subTotal= product?.price;
    console.log("Ini Total Add Cart=>",subTotal)
    let qty =1;

    // useEffect(() => {
    //     setTotalPrice(product?.price)
    // }, [product])

    // let qty = 1;
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                'Content-type': 'application/json',
                },
            };

            const body = JSON.stringify({
                // topping_id: topping_id,
                subtotal: subTotal,
                product_id: parseInt(id),
                qty: qty,
              });

            console.log("add cart =>",body)
            const response = await API.post('/cart', body, config)
            console.log(response.data.data);
            
        } catch (err) {
            console.log(err)
        }
    })

    return(
        <>
            <Navibar />
            <Container
                className="row m-auto"
                style={{ padding: "30px 90px" }}
                >
                <div className="mb-4 col-5 pe-5">
                    <Image src={product?.image} width="100%" />
                </div>
                <div className="col-7" style={{ fontSize: "1.15rem" }}>
                    <h3 className="fs-1 fw-bolder mb-3 text-danger">{product?.title}</h3>
                    <p className="fs-4 fw-semibold mb-5" style={{ color: "#984c4c" }}>Rp. {product?.price}</p>
                    <p className="fs-2 fw-bold" style={{ color: "#984c4c" }}>Toping</p>
                    <div className="row">
                        {toppings?.map((data) => (
                            <div className='col-3 text-center p-0 mb-2 mt-3'>
                                <img src={data.image} alt="" className="w-50 mb-2" />
                                <p className="fs-6 fw-semibold text-danger">{data.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className='row justify-content-between mt-5 mb-3' style={{ color: "#984c4c" }}>
                        <p className="col-3 fs-4 fw-bolder">Total</p> 
                        <p className="col-3 fs-4 fw-bolder text-end">Rp. {subTotal}</p>
                    </div>
                    <Button onClick={(e) => handleSubmit.mutate(e)} variant='danger' className="w-100 fw-bold">Add Cart</Button>
                
                </div>
            </Container>
        </>
    )
}

export default DetailProduct;