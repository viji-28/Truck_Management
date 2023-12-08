import React, { useEffect } from 'react';

const GoogleSignInButton = ({onSubmit}) => {
  const handleSignIn = (response) => {
    // sign in the user
    console.log('Profile:', response.credential);
      onSubmit(response.credential)
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:'137509583881-lomsa2ps8u5d81ktr9qsbnkqnso4j7eu.apps.googleusercontent.com',
      callback:handleSignIn
    })

    google.accounts.id.renderButton(
      document.getElementById('signIndiv'),
      {theme:'outline',size:'large'}
    )
  }, []);

  

  return (
    <div>
      <div id='signIndiv' ></div>
    </div>
  );
};

export default GoogleSignInButton;
