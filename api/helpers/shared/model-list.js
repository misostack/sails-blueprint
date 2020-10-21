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
    omits: {
      type: 'ref',
      required: false,
      defaultsTo: ['s'],
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const { model, req, omits } = inputs;
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
    // append search index
    const { indexField } = sails.config.search;
    if (_.keys(where).includes(indexField) && where[indexField] !== '') {
      where[`${indexField}`] = { contains: where[indexField] };
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
    const select = _.keys(model.attributes).filter(
      (attr) => ![...omits, indexField].includes(attr),
    );
    criteria[`select`] = select;

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
