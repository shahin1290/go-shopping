import jwt from 'jsonwebtoken';
import { APP_SECRET, APP_REFRESH_SECRET } from '../config';
import { User } from '../models';
import { AuthenticationError } from 'apollo-server-express';

export const issuTokens = async ({ name, email, id }) => {
  let token = await jwt.sign({ name, email, id }, APP_SECRET, {
    expiresIn: 120
  });

  let refreshToken = await jwt.sign({ name, email, id }, APP_REFRESH_SECRET, {
    expiresIn: '2d'
  });

  return { token, refreshToken };
};

export const getAuthUser = async (request, requiresAuth = false) => {
  const header = request.headers.authorization;
  if (header) {
    const token = jwt.verify(header, APP_SECRET);
    const authUser = await User.findById(token.id);
    if (!authUser) {
      throw new AuthenticationError('Invalid token, User Auth Failed');
    }
    if (requiresAuth) {
      return authUser;
    }
    return null;
  }
};

export const getRefreshTokenUser = async (request) => {

  const header = request.headers.refresh_token;
  if (header) {
    const token = jwt.verify(header, APP_REFRESH_SECRET);
    const authUser = await User.findById(token.id);
    if (!authUser) {
      throw new AuthenticationError('Invalid refresh token, User Auth Failed');
    }
    return authUser;
  }
};
