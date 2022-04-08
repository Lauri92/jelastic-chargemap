'use strict';
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '$2b$12$e13rkxVHzBEcd8Bt84jOvOaQFtdNjzgrArlf7IOasxtAqvIfoBGBK',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const getUserLogin = async (email) => {
  const user = users.filter((usr) => {
    return email === usr.email;
  });
  return user[0]
};

export {
  users,
  getUserLogin,
};
