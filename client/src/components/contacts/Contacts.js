import React, { Fragment , useContext,useRef,useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'
import { CSSTransition , TransitionGroup} from 'react-transition-group';
const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts,filtered,getContacts,loading} = contactContext;
    const nodeRef = useRef(null);
    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);
    if(contacts.length === 0){
        return(
            <h4>Please enter a contact.</h4>
        );
    }
   
    return (

      <Fragment>
            {contacts !== null && !loading ? (filtered !== null
            ? filtered.map((contact) => (
              
                  <ContactItem key={contact._id}  contact={contact} />
              ))
            : contacts.map((contact) => (
                
                  <ContactItem key={contact._id} contact={contact} />
            
              ))) : <Spinner/>
                }
       
      
      </Fragment>
    );
}
export default Contacts;