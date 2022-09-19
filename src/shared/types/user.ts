import { Document } from 'mongoose';
import { UserRoles } from '../../shared/user-roles';

export interface User extends Document {
  id?: string;
  firstName: string;
  lastName :string;
  email: string;
  password: string;
  phone: string;
  userRole?: UserRoles;
  organization: string;
  groupId : string;
}
