import * as mongoose from 'mongoose';
export const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt : { type: String, required: true },
    users : { type: [String], required: false },
  });