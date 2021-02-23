import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerValidate } from '../validators';
import { User } from '../../models';
import * as auth from '../../functions/auth';
import { issuTokens } from '../../functions/auth';

export default {
  Query: {
    profile: (root, args, { req }, info) => {},
    users: (root, args, { req }, info) => {},
    login: (root, { id }, { req }, info) => {},
    refreshToken: (root, args, { req }, info) => {}
  },

  Mutation: {
    register: async (root, args, { req }, info) => {
      const { error } = registerValidate.validate(args, { abortEarly: false });
      if (error) {
        throw new UserInputError('failed to register user', {
          validationError: error.details
        });
      }

      const user = await User.findOne({ email: args.email });

      if (user) {
        throw new Error('Email already registered');
      }
      const newUser = await User.create(args);
      const tokens = await issuTokens(newUser);
      return {
        user: newUser,
        ...tokens
      };
    }
  }
};
