module.exports = {
  friendlyName: 'Migrate search index',

  description: '',

  fn: async function () {
    sails.log(
      'Running custom shell script... (`sails run migrate-search-index`)',
    );
    // db instance
    const db = Admin.getDatastore().manager;
    const { indexField, entities } = sails.config.search;
    if (indexField && entities && entities.length > 0) {
      // generate index
      for (const entity of entities) {
        await sails.models[entity.collection]
          .stream()
          .eachRecord(async (record) => {
            await sails.helpers.shared.updateSearchIndex.with({
              record,
              collection: entity.collection,
            });
          });
        // add index
        const indexCritera = {};
        indexCritera[`${indexField}`] = 1;
        await db
          .collection(sails.models[entity.collection].tableName)
          .createIndex(indexCritera);
      }
    }
    sails.log('Done script... (`sails run migrate-search-index`)');
  },
};
