export const generateRandomPwd = (length: number): string => {
  let password = '';
  const possibleUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const possibleLower = 'abcdefghijklmnopqrstuvwxyz';
  const possibleNumber = '1234567890';
  const possibleSpecial = '@#$%^&+=!*()_-[]{};:\'",<.>?~`|';
  for (let i = 0; i < length / 4; i++) {
    password += possibleUpper.charAt(Math.floor(Math.random() * possibleUpper.length));
  }
  for (let i = 0; i < length / 4; i++) {
    password += possibleLower.charAt(Math.floor(Math.random() * possibleLower.length));
  }
  for (let i = 0; i < length / 4; i++) {
    password += possibleNumber.charAt(Math.floor(Math.random() * possibleNumber.length));
  }
  for (let i = 0; i < length / 4; i++) {
    password += possibleSpecial.charAt(Math.floor(Math.random() * possibleSpecial.length));
  }
  return password;
};
