const mongoose = require("mongoose");


const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOURL, dbOptions);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    console.log(`MongoDB connected: ${connection.connection.port}`);
    console.log(`MongoDB connected: ${connection.connection.name}`);
    console.log(`MongoDB connected: ${connection.connection.db}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
