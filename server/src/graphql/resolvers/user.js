import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import * as Joi from '@hapi/joi';
import { signupValidate, signinValidate } from '../validators';
import { User } from '../../models';
import * as auth from '../../functions/auth';

export default {
  Query: {
    me: (root, args, { req }, info) => {
      auth.checkSignedIn(req);
      return User.findById(req.session.userId);
    },
    users: (root, args, { req }, info) => {
      auth.checkSignedIn(req);
      return User.find({});
    },
    user: (root, { id }, { req }, info) => {
      auth.checkSignedIn(req);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }
      return User.findById(id);
    }
  },

  Mutation: {
    signUp: async (root, args, { req }, info) => {
      Joi.assert(args, signupValidate, { abortEarly: false });

      auth.checkSignedOut(req);

      const user = await User.create(args);

      req.session.userId = user.id;

      return user;
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session;

      if (userId) {
        return User.findById(userId);
      }

      Joi.assert(args, signinValidate, { abortEarly: false });

      const { email, password } = args;

      const user = await auth.attemptSigneIn(email, password);

      req.session.userId = user.id;

      return user;
    },
    signOut: async (root, args, { req, res }, info) => {
      auth.checkSignedIn(req);

      return auth.signOut(req, res);
    }
  }
};
