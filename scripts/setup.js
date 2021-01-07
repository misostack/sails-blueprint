module.exports = {
  friendlyName: 'Setup',

  description: 'Setup something.',

  fn: async function () {
    sails.log('[SETUP]: Starting');
    const { seeds } = sails.helpers.migrations;
    await seeds();
    sails.log('[SETUP]: Done');
  },
};
