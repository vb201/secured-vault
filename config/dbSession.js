const mongoose = require("mongoose");
const mongoStore = require('connect-mongo')

const MongoURI =
  "mongodb+srv://passwordVault:poelFuqccRu7FtSH@cluster0.xetlh.mongodb.net/MyVault?retryWrites=true&w=majority";
// password = poelFuqccRu7FtSH

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}; 

const connectDBSession = async () => {
  try {
    const connection = await mongoose.connect(MongoURI, dbOptions);
    const sessionStore = new mongoStore({
      mongooseConnection: connection,
      collection: 'sessions'
    });
    console.log(`MongoDB session Connected`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Sessionstore


module.exports = connectDBSession;
