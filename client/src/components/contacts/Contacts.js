import React, { Fragment , useContext,useRef} from 'react'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem'
import { CSSTransition , TransitionGroup} from 'react-transition-group';
const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts,filtered} = contactContext;
    const nodeRef = useRef(null)
    if(contacts.length === 0){
        return(
            <h4>Please enter a contact.</h4>
        );
    }

    return (
      <Fragment>
        
          {filtered !== null
            ? filtered.map((contact) => (
              
                  <ContactItem key={contact.id}  contact={contact} />
              ))
            : contacts.map((contact) => (
                
                  <ContactItem key={contact.id} contact={contact} />
            
              ))}
      
      </Fragment>
    );
}
export default Contacts;