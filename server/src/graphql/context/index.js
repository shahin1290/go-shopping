const jwt = require('jsonwebtoken');
const { User } = require('../../models');

module.exports = async (req) => {
  const auth = req ? req.headers.authorization : null;

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
    return await User.findById(decodedToken.id);
  }
};
