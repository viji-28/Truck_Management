// ContactForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ContactUs } from '../actions';
import Joi from 'joi';
import '../components/styles/contact.css';

const schema = Joi.object({
  name: Joi.string().required().label('FirstName'),
  email: Joi.string().required().label('LastName'),
  message: Joi.string().required().label('message'),
});

function ContactForm() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(value);
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log('FormData', formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    console.log('formData', formData);

    // setIsModalOpen(ModalOpen);
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.label] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      // submit the form
      dispatch(ContactUs(formData));
    }
  };
  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          onBlur={handleBlur}
          onChange={handleInputChange}
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;
