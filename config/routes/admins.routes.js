module.exports = {
  'post /admins': 'Admin/create',
  'get /admins/:id': 'Admin/findOne',
  'patch /admins/:id': 'Admin/updateOne',
  'delete /admins/:id': 'Admin/destroyOne',
  'get /admins': 'Admin/find',
};
