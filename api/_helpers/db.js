const mongoose = require('mongoose');
const connectMongo = async () => {
    const dbOptions = {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };
    let connectionUri = 'mongodb://localhost/bookingmanagement';
    await mongoose.connect(connectionUri, dbOptions).catch((err) => {
      Logger.log.fatal(`DATABASE - Error:${err}`);
    });
  };

module.exports = connectMongo;
    