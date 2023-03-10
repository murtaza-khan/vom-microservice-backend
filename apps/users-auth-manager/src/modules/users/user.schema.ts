import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  userRole: { type: String, required: true },
  organization: { type: String, required: false },
  groupId: { type: String, required: false }
});
export interface IUser extends mongoose.Document {
  password: string
}

// next: mongoose.HookNextFunction

UserSchema.pre<IUser>('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.pre('findOneAndUpdate', async function (
  next,
) {
  const updateFields = this.getUpdate();
  // console.log("updateFields: ", updateFields)
  const password = "updateFields.password";
  try {
    const rounds = bcrypt.getRounds(password);
    if (rounds === 0) {
      // updateFields.password = await bcrypt.hash(password, 10);
    }
    return next();
  } catch (error) {
    // updateFields.password = await bcrypt.hash(password, 10);
    return next();
  }
});
