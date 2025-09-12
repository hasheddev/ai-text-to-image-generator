import mongoose from "mongoose";
import bcrypt from "bcrypt";

export type UserType = {
  name: string;
  email: string;
  password: string;
  creditBalance: number;
};

const userSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creditBalance: { type: Number, default: 5 },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User =
  (mongoose.models.user as mongoose.Model<UserType>) ||
  mongoose.model<UserType>("user", userSchema);

export default User;
