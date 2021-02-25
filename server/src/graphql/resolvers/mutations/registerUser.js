const { UserInputError } = require('apollo-server-express');

module.exports = (root, args, { models }) => {
  console.log(args);
  const { name, email, password } = args;
  const user = new models.User({ name, email, password });

  return user.save().catch((error) => {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    });
  });
};
