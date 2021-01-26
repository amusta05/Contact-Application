import React,{useReducer } from 'react';
import AuthContext from './authContext';
import axios from 'axios';
import authReducer from './authReducer';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState = props => {
    
    const initalState = {
       token: localStorage.getItem('token'),
       isAuthenticated: null,
       loading: true,
       user: null,
       error: null,

    };
    const [state,dispatch] = useReducer(authReducer, initalState);
    // Actions that we will have

    // Load User 

    // Register User
    const register =  async formData => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        try {
            console.log("before");
            const res = await axios.post('/api/users',formData,config);
            console.log(res.data)
            dispatch({type: REGISTER_SUCCESS,payload: res.data});
        } catch (error) {
            dispatch({type: REGISTER_FAIL,payload: error.response.data.msg});
        }
    }

    // Login User 

    // Logout

    // Clear Errors

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            token: state.token,
            register


        }}>
           {props.children}
           
        </AuthContext.Provider>

    );
}
export default AuthState;

