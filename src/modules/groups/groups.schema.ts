import * as mongoose from 'mongoose';
export const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    managerId : { type: String, required: false},
    createdAt : { type: String, required: true }
  });