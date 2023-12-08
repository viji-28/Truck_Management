import React, { useEffect, useState } from 'react';
import './styles/testpage.css';
import Joi from 'joi';
import GoogleSignInButton from './Googlesign';
import jwt_decode from 'jwt-decode';
import MultiSelect from './MultiSelect';
import { useDispatch, useSelector } from 'react-redux';
import { Designation, signUp } from '../actions';
import { useNavigate } from 'react-router-dom';

// import image from './path-to-image';

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
  password: Joi.string().required().label('password'),
  designation: Joi.string().required().label('designation'),
  FirstName: Joi.string().required().label('FirstName'),
  LastName: Joi.string().required().label('LastName'),
});

// new

function SignUp() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const { designation } = useSelector((e) => e.functionReducer);
  const dispatch = useDispatch();
  const [ValueGoogle, setValueGoogle] = useState('');
  const [ButtonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    dispatch(Designation());
  }, []);
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    email: '',
    PhoneNo: '',
    Address: '',
    license_number: '',
    // Brand: '',
    // Model: '',
    // Variant: '',
    // VIN: '',
    // Engine_No: '',
    // Chasis_No: '',
    // RC_No: '',
    // Year_of_manufacture: '',
    // condition: '',
    password: '',
    designation: 'Driver',
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
    // console.log('formData', formData);
    nextStep();

    // setIsModalOpen(ModalOpen);
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.label] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      nextStep();

      // submit the form
    }
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const nextStep = () => {
    setStep(step + 1);
  };
  const navigate = useNavigate();
  const prevStep = () => {
    setStep(step - 1);
  };
  console.log('step', step);
  const onClickYes = () => {
    setButtonClicked(true);
  };
  const onClickNo = () => {
    setButtonClicked(false);
  };
  const handleSubmitLast = (e) => {
    console.log('e');
    e.preventDefault();
    console.log('formData', formData);
    dispatch(signUp(formData, navigate));
  };
  const GoogleSignIndata = async (data) => {
    console.log('data', data);
    let dataReturn = await jwt_decode(data);
    setValueGoogle(dataReturn);
  };

  const designationsMap = designation.map((data) => {
    return <option value={data.designation}>{data.designation}</option>;
  });

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {step === 1 && (
          <Step1
            nextStep={nextStep}
            setName={setName}
            setEmail={setEmail}
            formData={formData}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            GoogleSignIndata={GoogleSignIndata}
            ValueGoogle={ValueGoogle}
            handleSubmitLast={handleSubmitLast}
            errors={errors}
          />
        )}
        {/* {step === 2 && (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            name={name}
            email={email}
            formData={formData}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            handleSubmitLast={handleSubmitLast}
          />
        )}
        {step === 3 && (
          <Step3
            nextStep={nextStep}
            prevStep={prevStep}
            name={name}
            email={email}
            formData={formData}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            handleSubmitLast={handleSubmitLast}
          />
        )}
        {step === 4 && (
          <Step4
            handleSubmitLast={handleSubmitLast}
            nextStep={nextStep}
            prevStep={prevStep}
            name={name}
            email={email}
            formData={formData}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            designation={designation}
            designationsMap={designationsMap}
          />
        )} */}
      </div>
      <div style={{ flex: 1 }} className="divImage">
        <img
          src="https://excelacademy.edumatica.io/static/media/loginOrange.df1992fa.svg"
          alt="example"
        />
      </div>
    </div>
  );
}

function Step1({
  nextStep,
  setName,
  setEmail,
  formData,
  handleInputChange,
  handleBlur,
  handleSubmit,
  GoogleSignIndata,
  ValueGoogle,
  handleSubmitLast,
  errors,
}) {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   nextStep();
  // };

  return (
    <div className="step">
      <h2>
        <u>Personal Details</u>
      </h2>
      <form onSubmit={handleSubmitLast}>
        <input
          type="text"
          placeholder="First Name"
          name="FirstName"
          style={{ outline: 'none' }}
          value={ValueGoogle.given_name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={Object.keys(ValueGoogle).length !== 0}
        />
        <span style={{ color: 'red' }}>
          {errors.FirstName && <p>{errors.FirstName}</p>}
        </span>
        <input
          type="text"
          placeholder="Last Name"
          name="LastName"
          style={{ outline: 'none' }}
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={ValueGoogle.family_name}
          disabled={Object.keys(ValueGoogle).length !== 0}
        />
        <span style={{ color: 'red' }}>
          {errors.LastName && <p>{errors.LastName}</p>}
        </span>
        <input
          type="text"
          placeholder="email"
          name="email"
          style={{ outline: 'none' }}
          value={ValueGoogle.email}
          onChange={handleInputChange}
          disabled={Object.keys(ValueGoogle).length !== 0}
        />

        {/* <label htmlFor="Brand">Brand</label>
        <input
          type="text"
          name="Brand"
          value={formData.Brand}
          onChange={handleInputChange}
          required
          onBlur={handleBlur}
        /> */}
        <input
          type="text"
          name="PhoneNo"
          value={formData.PhoneNo}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
          onBlur={handleBlur}
        />
        <input
          type="text"
          name="Address"
          value={formData.Address}
          placeholder="Address"
          onChange={handleInputChange}
          required
          onBlur={handleBlur}
        />
        <input
          type="text"
          name="designation"
          value="Driver"
          disabled
          onChange={handleInputChange}
          required
          onBlur={handleBlur}
        />

        {/* <label htmlFor="Model">Model</label>
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
        /> */}
        <div className="or-wrapper">
          <div className="or-line"></div>
          <div className="or-text">or</div>
          <div className="or-line"></div>
        </div>
        <GoogleSignInButton onSubmit={GoogleSignIndata} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// function Step2({
//   nextStep,
//   prevStep,
//   name,
//   email,
//   formData,
//   handleInputChange,
//   handleBlur,
//   handleSubmit,
//   handleSubmitLast,
// }) {
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   nextStep();
//   // };

//   return (
//     <div className="step">
//       <h2>
//         <u>Stage 2</u>
//       </h2>

//       <form onSubmit={handleSubmit}>
//         <div className="MultiSelect">
//           <MultiSelect />
//         </div>
//         <label htmlFor="file-input" className="input-label">
//           Upload Lisence
//         </label>
//         <input
//           id="file-input"
//           type="file"
//           className="file-input"
//           accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
//           placeholder="Upload Lisence"
//           // onChange={onChange}
//         />
//         {/* <label htmlFor="Engine_No">Engine_No</label>
//         <input
//           type="text"
//           name="Engine_No"
//           value={formData.Engine_No}
//           onChange={handleInputChange}
//           required
//           onBlur={handleBlur}
//         />

//         <label htmlFor="Chasis_No">Chasis_No</label>
//         <input
//           type="text"
//           name="Chasis_No"
//           value={formData.Chasis_No}
//           onChange={handleInputChange}
//           required
//           onBlur={handleBlur}
//         />

//         <label htmlFor="RC_No">RC_No</label>
//         <input
//           type="text"
//           name="RC_No"
//           value={formData.RC_No}
//           onChange={handleInputChange}
//           required
//           onBlur={handleBlur}
//         />

//         <label htmlFor="Year_of_manufacture">Year_of_manufacture</label>
//         <input
//           type="text"
//           name="Year_of_manufacture"
//           value={formData.Year_of_manufacture}
//           onChange={handleInputChange}
//           required
//           onBlur={handleBlur}
//         />

//         <label htmlFor="condition">condition</label>
//         <input
//           type="text"
//           name="condition"
//           value={formData.condition}
//           onChange={handleInputChange}
//           required
//           onBlur={handleBlur}
//         /> */}
//         <input
//           type="text"
//           name="designation"
//           value="Driver"
//           disabled
//           onChange={handleInputChange}
//           required
//           onBlur={handleBlur}
//         />
//         <button type="button" onClick={prevStep}>
//           Previous
//         </button>
//         {/* <button type="submit">Submit</button> */}
//         <button type="submit">Next</button>
//       </form>
//     </div>
//   );
// }

// function Step3({
//   nextStep,
//   prevStep,
//   name,
//   email,
//   formData,
//   handleInputChange,
//   handleBlur,
//   handleSubmit,
// }) {
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   nextStep();
//   // };

//   return (
//     <div className="step">
//       <form onSubmit={handleSubmit}>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// function Step4({
//   handleSubmitLast,
//   nextStep,
//   prevStep,
//   name,
//   email,
//   formData,
//   handleInputChange,
//   handleBlur,
//   handleSubmit,
//   designation,
//   designationsMap,
// }) {
//   return (
//     <div className="step">
//       <form onSubmit={handleSubmitLast}>
//         <select onChange={handleInputChange} name="designation">
//           <option>Select an option</option>
//           {designationsMap}
//         </select>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//           required
//           onBlur={handleBlur}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
export default SignUp;
