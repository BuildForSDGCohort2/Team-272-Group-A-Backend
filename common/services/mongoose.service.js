const mongoose = require('mongoose');
require('dotenv').config();

let connectionString = 'mongodb://localhost:27017/digipatient';

if (process.env.PRODUCTION === '1') {
  connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DBURL}`;
}

let count = 0;

const options = {
  autoIndex: true, // build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  // geting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true,

};
const connectWithRetry = () => {
  try {
    console.log('MongoDB Trying  connection with retry');
    mongoose.connect(connectionString, options).then(() => {
      console.log('MongoDB is connected');
    }).catch((err) => {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
  } catch (error) {
    console.log(error);
  }
};

connectWithRetry();

exports.mongoose = mongoose;
