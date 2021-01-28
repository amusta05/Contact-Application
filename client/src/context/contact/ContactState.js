import React,{useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    CONTACT_ERROR
} from '../types'

const ContactState = props => {
    // dummy  data
    const initalState = {
        contacts:[],
        current: null,
        filtered: null,
        error:null
    };
    const [state,dispatch] = useReducer(contactReducer, initalState);
    // Actions that we will have

    // Get Contact
    const getContacts = async () =>{

        try {


            const res = await axios.get('/api/contacts')
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.msg});
            
        }

    }

    // Add Contact
    const addContact = async contact =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {


            const res = await axios.post('/api/contacts' , contact , config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.msg});
            
        }

    }
    // Delete Contact
    const deleteContact = async id =>{
        try {


            await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.msg});
            
        }
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    }

    // Set Current Contact
    const setCurrent = contact =>{
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    }

    // Clear Current Contact
    const clearCurrent = () =>{
        dispatch({
            type: CLEAR_CURRENT
        });
    }

    // Update Contact
    const updateContact = async contact =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            console.log(contact._id);
            const res = await axios.put(`/api/contacts/${contact._id}` , contact , config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.msg});
            
        }

       
    }

    // Filter Contact
    const filterContact = text =>{
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    }

    // Clear Filter
    const clearFilter = () =>{
        dispatch({
            type: CLEAR_FILTER
        });
    }
    const clearContacts = () =>{
        dispatch({
            type: CLEAR_CONTACTS
        });
    }
    return (
        <ContactContext.Provider value={{
            contacts:state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            clearFilter,
            filterContact,
            getContacts,
            clearContacts
        }}>
           {props.children}
           
        </ContactContext.Provider>

    );
}
export default ContactState;

