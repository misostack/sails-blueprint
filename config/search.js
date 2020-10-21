/**
 * Search Index configuration
 */

module.exports.search = {
  indexField: 's',
  entities: [{ collection: 'admin', fields: ['firstName', 'lastName'] }],
};
