import React from 'react';
import Navibar from './navbar';
import background from '../../assets/Jumbotron.png';
import MenuProducts from './menuProduct';
import AddProduct from './addProduct';


function Home () {
    return (
        <>
            <Navibar />
            <section>
                <div style={{ margin: 'auto', padding: '0 130px' }}>
                    <img src={background} alt="" />
                </div>
            </section>
            <MenuProducts />
        </>
    )
}

export default Home;