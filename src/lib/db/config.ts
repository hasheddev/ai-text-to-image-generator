import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export const connectDB = async () => {
  if (connection.isConnected === 1) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGOBD_URI!);
  connection.isConnected = db.connections[0].readyState;
};
