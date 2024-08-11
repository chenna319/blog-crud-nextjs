import mongoose, { connect } from "mongoose";

const connectionToDatabase = () => {
  const connectionUrl =
    process.env.MONGODB_URL ||
    "mongodb+srv://chennavemulapalli5:vemulapalli77300@cluster0.utuh8.mongodb.net/";

  mongoose
    .connect(connectionUrl)
    .then(console.log("blog database connection successful"))
    .catch((e) => console.log(e));
};

export default connectionToDatabase;
