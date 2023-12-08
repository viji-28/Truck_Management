// App.js

import React from 'react';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import '../components/styles/contact.css';

function CardsList() {
    return (
        <div className="CardsMap">
            <div className="card-container">
                <ContactCard
                    name="Johny"
                    pic="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
                    phone="9037369145"
                    email="johndoe@example.com"
                />
                <ContactCard
                    name="Anoop"
                    pic="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                    phone="9188202145"
                    email="janedoe@example.com"
                />
                <ContactCard
                    name="Alexandra"
                    pic="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-733872.jpg&fm=jpg"
                    phone="9188202145"
                    email="bobsmith@example.com"
                />
            </div>
            <ContactForm />
        </div>
    );
}

export default CardsList;
