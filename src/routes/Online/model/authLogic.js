
var _ = require('lodash');

export const validateCred = (userInfo,users) => {
  let message = {};
  console.log(userInfo);
  (userInfo.name.length > 10) && (message.name = 'Username has to be less than 10 letters.');
  (userInfo.name.length < 4) && (message.name = 'Username has to be more than 4 letters.');
  (userInfo.pwd.length < 4) && (message.pwd = 'Password has to be more than 4 letters.');
  !(_.includes(userInfo.email,'@')) && (message.email = 'Please enter a valid e-mail.');
  (_.find(users, (u) => {return (userInfo.name == u.name)})) && (message.name = 'Username already exists.');
  (_.find(users, (u) => {return (userInfo.email == u.email)}))  && (message.email = 'Email already in use.');
  console.log(message);
  return message;
};

export const validateUser = (userInfo, users) => {
   return _.find(users, (u) => {
      return (userInfo.name == u.name && userInfo.pwd == u.pwd)
  });
};
