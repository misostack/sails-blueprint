module.exports = {
  friendlyName: 'Validate is unique',

  description: '',

  inputs: {
    model: {
      type: 'ref',
      required: true,
    },
    data: {
      type: 'ref',
      required: false,
    },
    field: {
      type: 'ref',
      required: true,
    },
    value: {
      type: 'ref',
      required: true,
    },
    id: {
      type: 'ref',
      required: false,
      defaultsTo: false,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    // TODO
    // eslint-disable-next-line no-unused-vars
    const { model, data, field, value, id } = inputs;
    let criteria = {
      where: {},
      limit: 1,
      select: ['id'],
    };
    criteria.where[`${field}`] = value;
    if (id) {
      criteria.where['id'] = { '!=': id };
    }
    const existedRecord = await model.find(criteria);
    if (existedRecord.length === 0) {
      return false;
    }
    return { name: 'validate_is_unique', code: `e_unique` };
  },
};
