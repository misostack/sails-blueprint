const seeds = require('../../../migrations/seeds');
module.exports = {
  friendlyName: 'Seeds',

  description: 'Seeds migration.',

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    // TODO
    sails.log.verbose(seeds);
    const res = {
      admins: [],
    };
    // Clean
    await Admin.destroy({});
    // Create Seeds
    let admins = seeds.admins;
    if (admins && admins.length > 0) {
      admins = admins.map((data) => {
        return new Promise(async (resolve) => {
          // create if not exists
          const isDuplicatedEmail = await sails.helpers.shared.validateIsUnique.with(
            {
              model: Admin,
              data: data,
              field: 'email',
              value: data.email,
            },
          );
          const isDuplicatedUsername = await sails.helpers.shared.validateIsUnique.with(
            {
              model: Admin,
              data: data,
              field: 'email',
              value: data.email,
            },
          );
          if (isDuplicatedEmail || isDuplicatedUsername) {
            resolve(false);
          } else {
            const record = await Admin.create(data).fetch();
            // update search Index
            await sails.helpers.shared.updateSearchIndex.with({
              record,
              collection: 'admin',
            });
            resolve(record);
          }
        });
      });
      res.admins = await Promise.all(admins);
    }
    return exits.success(res);
  },
};
