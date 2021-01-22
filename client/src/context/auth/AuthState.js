import React,{useReducer } from 'react';
import AuthContext from './authContext';
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
    // dummy  data
    const initalState = {
       token: localStorage.getItem('token'),
       isAuthenticated: null,
       loading: true,
       user: null,
       user: null,
       error: null,

    };
    const [state,dispatch] = useReducer(authReducer, initalState);
    // Actions that we will have

    // Load User 

    // Register User

    // Login User 

    // Logout

    // Clear Errors

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            token: state.token


        }}>
           {props.children}
           
        </AuthContext.Provider>

    );
}
export default AuthState;

