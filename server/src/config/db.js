require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.DATABASE_URL;

const connectDb = () => {
  console.log('connecting to', MONGODB_URI);

  mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });
}

module.exports = connectDb


