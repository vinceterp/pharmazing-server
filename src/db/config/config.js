import mongoose from "mongoose";

const connectDB = async () => {
  const DATABASE_URL = process.env.DATABASE_URL;
  // console.log(DATABASE_URL);

  try {
    await mongoose.connect(DATABASE_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log("MongoDB connected");
    // return mongoClient;
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
