import { Document } from 'mongoose';
import { User } from './user';

export interface Group extends Document {
  id?: string;
  name:string;
  createdAt:string;
  users:[User];
}
