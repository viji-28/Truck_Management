import React, { useState } from 'react';
import Modal from 'react-modal';
import '../components/styles/signup.css';
import { Link } from 'react-router-dom';
import Joi from 'joi';

const schema = Joi.object({
  Brand: Joi.string().required().min(2).max(30).label('brand'),
  Model: Joi.string().required().min(2).max(30).label('model'),
  Variant: Joi.string().required().min(2).max(30).label('variant'),
  VIN: Joi.string()
    .required()
    .regex(/[A-HJ-NPR-Z0-9]{17}/)
    .label('vin'),
  Engine_No: Joi.string().required().min(3).max(30).label('engineNo'),
  Chasis_No: Joi.string().required().min(3).max(30).label('chassisNo'),
  RC_No: Joi.string()
    .required()
    .min(3)
    .max(30)
    .regex(/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/)
    .label('rcNo'),
  // rcPhoto: Joi.string().required().label('rcPhoto'),
  Year_of_manufacture: Joi.number()
    .required()
    .min(1950)
    .max(new Date().getFullYear())
    .label('Year of Manufacturing'),
  // photos: Joi.array().items(Joi.string()).min(1).required().label('photos'),
  condition: Joi.string().required().label('status'),
});

const SignUpModal = ({ ModalOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    Brand: '',
    Model: '',
    Variant: '',
    VIN: '',
    Engine_No: '',
    Chasis_No: '',
    RC_No: '',
    Year_of_manufacture: '',
    condition: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData', formData);
    setIsModalOpen(ModalOpen);
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.label] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      // submit the form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={() => setIsModalOpen(ModalOpen)}>Choose Truck</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="Modal"
      >
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Brand">Brand</label>
          <input
            type="text"
            name="Brand"
            value={formData.Brand}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
          />

          <label htmlFor="Model">Model</label>
          <input
            type="text"
            name="Model"
            value={formData.Model}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
          />

          <label htmlFor="Variant">Variant</label>
          <input
            type="text"
            name="Variant"
            value={formData.Variant}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
          />

          <label htmlFor="VIN">VIN</label>
          <input
            type="text"
            name="VIN"
            value={formData.VIN}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
          />

          <label htmlFor="Engine_No">Engine_No</label>
          <input
            type="text"
            name="Engine_No"
            value={formData.Engine_No}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
          />

          <label htmlFor="Chasis_No">Chasis_No</label>
          <input
            type="text"
            name="Chasis_No"
            value={formData.Chasis_No}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
          />

          <label htmlFor="RC_No">RC_No</label>
          <input
            type="text"
            name="RC_No"
            value={formData.RC_No}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
          />

          <label htmlFor="Year_of_manufacture">Year_of_manufacture</label>
          <input
            type="text"
            name="Year_of_manufacture"
            value={formData.Year_of_manufacture}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
          />

          <label htmlFor="condition">condition</label>
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
          />
          <button type="submit">Sign Up</button>
        </form>
      </Modal>
    </form>
  );
};

export default SignUpModal;
