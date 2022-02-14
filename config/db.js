const mongoose = require("mongoose");

// const MongoURI =
//   "mongodb+srv://passwordVault:poelFuqccRu7FtSH@cluster0.xetlh.mongodb.net/MyVault?retryWrites=true&w=majority";
// // password = poelFuqccRu7FtSH

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOURL, dbOptions);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
