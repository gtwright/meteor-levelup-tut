import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/Resolution.graphql';
import ResolutionsResolvers from '../../api/resolutions/resolvers';

import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolvers';

import GoalsSchema from '../../api/goals/Goal.graphql';
import GoalsResolvers from '../../api/goals/resolvers';

const baseSchema = `
  type Query
  type Mutation
`;
// 
const typeDefs = [baseSchema, ResolutionsSchema, UsersSchema, GoalsSchema ];
const resolvers = merge(ResolutionsResolvers, UsersResolvers, GoalsResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
//
createApolloServer({schema});
