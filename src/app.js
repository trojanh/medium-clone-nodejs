import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Post from './resolvers/Post';
import User from './resolvers/User';
import { MONGODB_URI, PORT } from './config';
import authenticate from './lib/authenticate';
import models from "./models";

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Post,
    User
  },
  context: req => ({ ...req, models, loggedInUser: () => authenticate(req, models) }),
})

connect();

function listen() {
  server.start({ PORT }, () => {
    console.log(`The server is up on port ${PORT}!`);
  })
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(MONGODB_URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}