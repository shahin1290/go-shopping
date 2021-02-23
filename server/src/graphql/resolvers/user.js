import Joi from '@hapi/joi';
import { UserInputError } from 'apollo-server-express';
import { registerValidate, loginValidate } from '../validators';
import { User } from '../../models';
import {
  issuTokens,
  getAuthUser,
  getRefreshTokenUser
} from '../../functions/auth';

export default {
  Query: {
    profile: async (root, args, { req }, info) => {
      const authUser = await getAuthUser(req);
      return authUser;
    },
    users: async (root, args, { req }, info) => {
      await getAuthUser(req);
      const users = await User.find();
      return users;
    },
    login: async (root, args, { req }, info) => {
      Joi.assert(args, loginValidate, { abortEarly: false });

      const user = await User.findOne({ email: args.email });

      if (!user) {
        throw new Error('User is not registered');
      }

      const isMatch = user.matchPassword(args.password);

      if (!isMatch) {
        throw new Error('Invalid password');
      }

      const tokens = await issuTokens(user);

      return {
        user,
        ...tokens
      };
    },
    refreshToken: async (root, args, { req }, info) => {
      const authUser = await getRefreshTokenUser(req);
      const tokens = await issuTokens(authUser);
      return {
        user: authUser,
        ...tokens
      };
    }
  },

  Mutation: {
    register: async (root, args, { req }, info) => {
      Joi.assert(args, registerValidate, { abortEarly: false });

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
