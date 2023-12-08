// pasword creating and hashing
exports.generatePassword = async () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?`-=[];,./\\|';
  const charsLength = chars.length;
  let password = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charsLength);
    password += chars.charAt(randomIndex);
  }

  return password;
};
