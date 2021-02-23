import jwt from 'jsonwebtoken';
import { APP_SECRET, APP_REFRESH_SECRET } from '../config';

export const issuTokens = async ({ name, email, id }) => {
  let token = await jwt.sign({ name, email }, APP_SECRET, { expiresIn: 120 });

  let refreshToken = await jwt.sign({ name, email }, APP_SECRET, {
    expiresIn: '2d'
  });

  return { token, refreshToken };
};
