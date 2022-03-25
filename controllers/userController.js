import {users} from '../models/userModel.js';

const user_list_get = async (req, res) => {

  users.forEach(user => {
    delete user.password;
  });

  res.json(users);
};

const user_get = async (req, res) => {
  const chosenUser = users.filter(user => {
    return req.params.id === user.id;
  });
  delete chosenUser[0].password;
  res.send(chosenUser);
};

const user_post = async (req, res) => {
  console.log(req.body);
  res.send(req.body);
};

export {
  user_list_get,
  user_get,
  user_post,
};