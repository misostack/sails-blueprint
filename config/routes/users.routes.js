module.exports = {
  'post /users': 'User/create',
  'get /users/:id': 'User/findOne',
  'patch /users/:id': 'User/updateOne',
  'delete /users/:id': 'User/destroyOne',
  'get /users': 'User/find',
};
