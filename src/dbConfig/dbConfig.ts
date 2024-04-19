import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MONGODB CONNECTED ");
    });
    connection.on("error", (error) => {
      console.log(
        "MONGODB CONNECTION ERROR , PLEASE MAKE SURE DB IS UP AND RUNNING ",
        error
      );
      process.exit();
    });
  } catch (error) {
    console.log("SOMETHING WENT WRONG WHILE CONNECTING TO DB");
    console.log(error);
  }
}
