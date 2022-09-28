import { Document } from 'mongoose';
import { User } from './user';
import { Group } from './groups';
export interface Organization extends Document {
  id?: string;
  name: string;
  address: string;
  logo: string;
  BN: string;
  createdAt: string;
  subscriptionDate: string;
  subscriptionStatus: string;
  groups: [Group];
  affiliateId: string;
  admin: [User];
}
