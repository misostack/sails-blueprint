const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Welcome to graphql world!' };

const graphql = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
module.exports = graphql;
