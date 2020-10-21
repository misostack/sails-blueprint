const pluralize = require('pluralize');
module.exports = {
  friendlyName: 'Model list',

  description: '',

  inputs: {
    model: {
      type: 'ref',
      required: true,
    },
    req: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const { model, req } = inputs;
    const where = req.param('filter', [])[0];
    const number = Math.max(parseInt(req.param('page', 1)), 1);
    const size = Math.min(Math.max(parseInt(req.param('size', 10)), 1), 50);
    const sortInput = req.param('sort', [{ id: 'DESC' }])[0];
    let sort = [];
    for (const k of _.keys(sortInput)) {
      let sortField = {};
      sortField[`${k}`] = sortInput[k];
      sort.push(sortField);
    }
    // transform sort to array
    // const associations = req.param('associations', []);
    // const subcriteria = req.param('subcriteria', {});
    // okie
    const totalElements = await model
      .count(where)
      .meta({ makeLikeModifierCaseInsensitive: true });
    const totalPages = Math.ceil(totalElements / size);
    const names = pluralize(model.identity);
    const skip = (number - 1) * size;
    const limit = size;
    const criteria = { where, sort, limit, skip };
    // build
    const elements = await model
      .find(criteria)
      .meta({ makeLikeModifierCaseInsensitive: true });

    const res = {
      page: {
        size,
        totalElements,
        totalPages,
        number,
      },
      filter: where,
    };
    res[`${names}`] = elements;
    return res;
  },
};
