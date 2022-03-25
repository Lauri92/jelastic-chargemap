'use strict';
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const getUserLogin = (email) => {
  return users.filter((usr) => {
    return email[0] === usr.email;
  });
};

export {
  users,
  getUserLogin,
};
