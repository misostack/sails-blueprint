module.exports = {
  friendlyName: 'Update search index',

  description: '',

  inputs: {
    record: {
      type: 'ref',
      required: true,
    },
    collection: {
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
    // TODO
    const { indexField, entities } = sails.config.search;
    const { record, collection } = inputs;
    const foundEntities = entities.filter((e) => e.collection === collection);
    const entity = foundEntities.length ? foundEntities[0] : false;
    if (entity) {
      const values = {};
      let indexValues = [];
      const fieldValues = _.pick(record, entity.fields);
      for (let k of _.keys(fieldValues)) {
        indexValues.push(_.toLower(fieldValues[k]));
      }
      values[`${indexField}`] = indexValues.join(' ');
      await sails.models[entity.collection]
        .updateOne({ id: record.id })
        .set(values);
    }
    return '';
  },
};
