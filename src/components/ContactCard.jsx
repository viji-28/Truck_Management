// ContactCard.js

import React from 'react';
import '../components/styles/contact.css';

function ContactCard({ name, pic, phone, email }) {
    return (
        <div className="card">
            <img src={pic} alt={name} />
            <h2>{name}</h2>
            <p>{phone}</p>
            <p>{email}</p>
            <div className="overlay">
                <div className="overlay-content">
                    <h3>Contact {name}</h3>
                    <p>Phone: {phone}</p>
                    <p>Email: {email}</p>
                </div>
            </div>
        </div>
    );
}

export default ContactCard;
