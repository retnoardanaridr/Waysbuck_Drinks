import React, { useReducer, createContext } from 'react';

export const UserContext = createContext();


//nilai default state declar
const defaultState = {
    isLogin: false,
    user: {},
    cart: {},
}

const reducer = (user, action)  => {
    const {type, payload} = action 

    switch (type) {
        case 'USER_SUCCESS':
        case 'LOGIN_SUCCESS':
            console.log(payload.token)
            localStorage.setItem("token", payload.token)
            return {
                isLogin:true,
                user:payload
            };
        case 'ADD_CART_SUCCESS':
            return{
                cart: {}
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem("token");
            return {
                isLogin: false,
                user: {}
            }
        default: throw new Error()
    }
}

export const UserContextProvider = ({ children }) => {
    //save data and update state
    const [ state, dispatch ] = useReducer(reducer, defaultState)
    return (
        <UserContext.Provider value={ [state, dispatch] }>
            { children }
        </UserContext.Provider>
    );
};

