module.exports.models = {
  migrate: 'alter',

  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true },
    id: { type: 'string', columnName: '_id' },
  },

  dataEncryptionKeys: {
    default: 'Cvk74GQVEWq4MNwaIR9ORoORUNLMiz6lzanMe4TMUOs=',
  },

  cascadeOnDestroy: true,
};
