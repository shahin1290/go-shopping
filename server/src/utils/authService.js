const jwt = require('jsonwebtoken')
const { AuthenticationError } = require ('apollo-server-express');

const oneWeek = 1000 * 60 * 60 * 24 * 7;

const subject = 'accessToken';

class AuthService {
  constructor({ accessToken, jwtSecret }) {
    this.jwtSecret = jwtSecret;
    this.accessToken = accessToken;
  }

  getUserId() {
    if (!this.accessToken) {
      return null;
    }

    let tokenPayload;

    try {
      tokenPayload = jwt.verify(this.accessToken, this.jwtSecret, { subject });
    } catch (e) {
      return null;
    }

    return tokenPayload.userId;
  }

  createAccessToken(userId) {
    return {
      accessToken: jwt.sign({ userId }, this.jwtSecret, {
        expiresIn: '7d',
        subject,
      }),
      expiresAt: new Date(Date.now() + oneWeek),
    };
  }

  assertIsAuthorized() {
    const userId = this.getUserId();

    if (!userId) {
      throw new AuthenticationError('Access token is invalid or expired');
    }

    return userId;
  }
}

const createAuthService = options => new AuthService(options);

module.exports = createAuthService;