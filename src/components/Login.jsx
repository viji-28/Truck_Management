import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleSignInButton from './Googlesign';
import jwt_decode from 'jwt-decode';

import '../components/styles/login.css';
import '../components/styles/signup.css';
import MultiSelect from './MultiSelect';
import SignUpModal from './SignUp';
import { useDispatch } from 'react-redux';
import { islogin } from '../actions';
import MainTest from './MainTest';

function LoginPage() {
  const dispatch = useDispatch();
  const [ValueGoogle, setValueGoogle] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [ButtonClicked, setButtonClicked] = useState(false);
  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [LoginData, setLoginData] = useState({
    Username: '',
    Password: '',
  });

  const handleFormSwitch = () => {
    setShowLoginForm(!showLoginForm);
  };

  const GoogleSignIndata = async (data) => {
    console.log('data', data);
    let dataReturn = await jwt_decode(data);
    setValueGoogle(dataReturn);
  };
  console.log('ValueGoogle', ValueGoogle);

  const onClickYes = () => {
    setButtonClicked(true);
  };
  const onClickNo = () => {
    setButtonClicked(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(islogin(data));
  };

  console.log(ButtonClicked);
  return (
    <div className="Login">
      <div className="form-container">
        <h1>{showLoginForm ? 'Login' : 'Sign Up'}</h1>
        {!showLoginForm ? (
          <div className="SignUpFields">
            <input
              type="text"
              placeholder="First Name"
              style={{ outline: 'none' }}
              value={ValueGoogle.given_name}
              disabled={Object.keys(ValueGoogle).length !== 0}
            />

            <input
              type="text"
              placeholder="Last Name"
              style={{ outline: 'none' }}
              value={ValueGoogle.family_name}
              disabled={Object.keys(ValueGoogle).length !== 0}
            />
            <input
              type="text"
              placeholder="email"
              style={{ outline: 'none' }}
              value={ValueGoogle.email}
              disabled={Object.keys(ValueGoogle).length !== 0}
            />
            <MultiSelect />
            <div className="input-container">
              <label htmlFor="file-input" className="input-label">
                Upload Lisence
              </label>
              <input
                id="file-input"
                type="file"
                className="file-input"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                placeholder="Upload Lisence"
                // onChange={onChange}
              />
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              style={{ outline: 'none' }}
            />

            <div className="SignUpFields">
              <label>Do You Own a truck?</label>
              <button className="button" onClick={onClickYes}>
                Yes
              </button>
              <button className="button" onClick={onClickNo}>
                No
              </button>
            </div>
            {ButtonClicked ? <MainTest /> : null}
            <button
              style={{ background: '#e2970c', textDecoration: 'none' }}
              type="submit"
            >
              {showLoginForm ? 'Login' : 'Sign Up'}
            </button>
            <div className="or-wrapper">
              <div className="or-line"></div>
              <div className="or-text">or</div>
              <div className="or-line"></div>
            </div>
            <GoogleSignInButton onSubmit={GoogleSignIndata} />
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="Username"
              style={{ outline: 'none' }}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="Password"
              style={{ outline: 'none' }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              style={{ background: '#e2970c', textDecoration: 'none' }}
              type="submit"
            >
              {showLoginForm ? 'Login' : 'Sign Up'}
            </button>
          </form>
        )}

        {showLoginForm ? (
          <Link to="/auth/signup">
            <button onClick={handleFormSwitch}>Switch to Sign Up</button>
            <div className="or-wrapper">
              <div className="or-line"></div>
              <div className="or-text">or</div>
              <div className="or-line"></div>
            </div>
            <GoogleSignInButton onSubmit={GoogleSignIndata} />
          </Link>
        ) : (
          <Link to="/login">
            <button onClick={handleFormSwitch}>Switch to Login</button>
          </Link>
        )}
      </div>
      <div className="image-container" />
    </div>
  );
}

export default LoginPage;
