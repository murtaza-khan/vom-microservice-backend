import * as mongoose from 'mongoose';
import { UserSchemaInGroup } from '../users/user.schema';
export const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt : { type: String, required: true },
    users : { type: [UserSchemaInGroup], required: true },
  });