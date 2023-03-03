import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { UserContext } from '../../client/src/contexts/userContext';
import { API, setAuthToken } from './config/api';

//component
import Home from './component/pages/home';
import Transaction from './component/pages/transaction';
import DetailProduct from './component/pages/detailProduct';
import Cart from './component/pages/cart';
import AddProduct from './component/pages/addProduct';
import AddTopping from './component/pages/addTopping';
import MyProfile from './component/pages/myProfile';


function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  
  useEffect(() => {
    
    //Init token every time the app is refreshed
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate('/');
    } 
    else {
      if (state.user.role === 'admin') {
        navigate('/');
        console.log(state.user.role)
      } else if (state.user.role === 'user') {
        navigate('/')
        console.log(state.user.role)
      }
    }
  }, [state]);

  const checkUserAuth = async () => { 
    try { 
       if (localStorage.token) { 
          setAuthToken(localStorage.token); 
          const response = await API.get("/check-auth"); 
  
          let payload = response.data.data; 
          payload.token = localStorage.token;
          console.log(localStorage.token);
     
          dispatch({ 
             type: "USER_SUCCESS", 
             payload, 
          }); 
       } 
    } catch (error) { 
      console.log(error); 
    } 
 };


  useEffect(() => {
    checkUserAuth();
  }, [])

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/product:id' element={<DetailProduct />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/profile' element={<MyProfile />} />
        {/* admin */}
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/add-topping' element={<AddTopping />} />
      </Routes>
    </>
  );
}

export default App;
