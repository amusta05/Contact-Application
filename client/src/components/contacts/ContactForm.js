import React, {useState,useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';
const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const {addContact, current } = contactContext; 
    const [contact, setContact] = useState({
        name:'',
        email: '',
        phone: '',
        type: 'personal'
    });

    const {name,  email, phone, type} = contact;

    useEffect(() => {
        if(current !== null){
            setContact(current);
        }
        else{
            setContact({
                name:'',
                email: '',
                phone: '',
                type: 'personal'
            });

        }

    },[contactContext,current]);
    const onChange = e => {
        setContact({...contact , [e.target.name]: e.target.value});
    }
    const onSubmit = e =>  {
        e.preventDefault();
        addContact(contact)
        setContact({
            name:'',
            email: '',
            phone: '',
            type: 'personal'
        });

    }
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h4>Contact Type</h4>
            <input type="radio" name = "type" value="personal" onChange={onChange} checked={type === 'personal'} /> Personal {' '}
            <input type="radio" name = "type" value="professional" onChange={onChange} checked={type === 'professional'} /> Professional {' '}
            <div>
                <input type = "submit" value={current ? 'Edit Contact' : 'Add Contact'} className="btn btn-primary btn-block" />

            </div>
        </form>

     )
}
export default ContactForm;