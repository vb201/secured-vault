const mongoose = require("mongoose");
const mongoStore = require('connect-mongo')



const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}; 

const connectDBSession = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOURL, dbOptions);
    const sessionStore = new mongoStore({
      mongooseConnection: connection,
      collection: 'sessions'
    });
    console.log(`MongoDB session Connected`);
    return sessionStore;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Sessionstore


module.exports = connectDBSession;
