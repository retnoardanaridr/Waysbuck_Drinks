import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';
import clip from '../../assets/clip.png'
import Navibar from './navbar';
import { Alert } from 'react-bootstrap';

function AddProduct() {
    const navigate = useNavigate();
    const [message, setMessage] = useState();
    const [preview, setPreview] = useState(null); //For image preview

    const [form, setForm] = useState({
        title: '',
        price: '',
        image: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        });
        // Create image url for preview
    if (e.target.type === 'file') {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const formData = new FormData();
            formData.set('title', form.title);
            formData.set('price', form.price);
            formData.set('image', form.image[0], form.image[0].name);
            //insert db
            const response = await API.post('/product', formData)
            const alert = (
                <Alert variant='success' className='py-1'>
                    Success
                </Alert>
            )
            setMessage(alert)
            console.log(response);
            navigate('/');
        } catch (error) {
            console.log(error);
            const alert = (
                <Alert variant='danger' className='py-1'>
                    Failed
                </Alert>
            )
            setMessage(alert)
        }
    })

    return (
        <>
            <Navibar />
                <main className="body">
                    <section className="pt-3 d-flex jc-between ai-start">
                        <form className="w-50 flex-col mx-5"
                            onSubmit={(e) => handleSubmit.mutate(e)}
                        >
                            {message && message}
                            <h2 className="mb-3 txt-red fw-700">Product</h2>
                            <input className="modal-input mb-1 br-red br-5"
                                type="text"
                                id="title" name="title"
                                placeholder="Name Product"
                                onChange={handleChange}
                                required
                            />
                            <input className="modal-input mb-1 br-red br-5"
                                type="number"
                                id="price" name="price"
                                placeholder="Price"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="file"
                                name="image" id="photo-product"
                                hidden
                                placeholder='Add-product'
                                onChange={handleChange}
                                required
                            />
                            <label className="input mb-4 flex jc-between ai-center" htmlFor="photo-product">
                                <img src={clip} alt="" style={{width:'25px'}}/>
                            </label>
                            <div className="flex jc-center mb-4">
                                <button className="btn btn-danger">Add Product</button>
                            </div>
                        </form>
                        <div>
                            {preview && (
                                <div className='flex-col mx-5'>
                                    <img 
                                    src={preview} 
                                    alt='product' 
                                    className='w-52'
                                />
                                </div>  
                            )}
                        </div>
                    </section>
                </main>
        </>
    )
}

export default AddProduct;