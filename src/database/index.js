import mongoose, { connect } from "mongoose";

const connectionToDatabase = () => {
  const connectionUrl = process.env.MONGODB_URL;

  mongoose
    .connect(connectionUrl)
    .then(console.log("blog database connection successful"))
    .catch((e) => console.log(e));
};

export default connectionToDatabase;
