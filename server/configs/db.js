import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );

    mongoose.connection.on("error", (err) =>
      console.log("Database Connection Error:", err)
    );

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "VibeDraft",  // Proper way to specify DB name
    });

  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }
};

export default ConnectDB;
