import React, { Fragment } from 'react'
import ContactContext from '../../context/contact/contactContext';
const ContactItem = () => {
    const contactContext = useContext(ContactContext);
    const {contacts} = contactContext;

    return (
        <Fragment>
            {contacts.map(contact => <h3>{contact.name}</h3>)}
        </Fragment>
    )
}
export default Contacts;