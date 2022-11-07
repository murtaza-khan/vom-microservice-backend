import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

import { IId, IQuery, ICount } from '../commons/commons.interface';
import {
  ForgotPassword,
  ForgotPasswordInput,
  ResetPassword,
  ResetPasswordInput,
  ResetPasswordUpdateInput,
  User,
  UsersConnection,
  ResponseType,
  UserInPut,
  UserUpdateInPut,
  OrgIdInput,
  UserPayload,
  LoginUserInput,
  Token,
} from '../graphql/typings';

export enum UserRoles {
  'SUPER_ADMIN' = 'super',
  'AFFLIATE' = 'affliate',
  'ADMIN' = 'admin',
  'GROUP_MANAGER' = 'group_manager',
  'EMPLOYEE' = 'employee',
}

export interface IUsersService {
  find(query: IQuery, metadata?: Metadata): Observable<UsersConnection>;
  findById(id: IId, metadata?: Metadata): Observable<User>;
  findOne(query: IQuery, metadata?: Metadata): Observable<User>;
  getUsersByOrgId(
    orgId: OrgIdInput,
    metadata?: Metadata
  ): Observable<UserPayload>;
  getUsersByGroupId(
    groupId: String,
    metadata?: Metadata
  ): Observable<UserPayload>;
  getManagersByOrgID(
    orgId: String,
    metadata?: Metadata
  ): Observable<UserPayload>;
  findOne(query: IQuery, metadata?: Metadata): Observable<User>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: UserInPut, metadata?: Metadata): Observable<UserPayload>;
  update(input: UserUpdateInPut, metadata?: Metadata): Observable<User>;
  destroy(query: IQuery, metadata?: Metadata): Observable<ResponseType>;
  forgotPassword(
    input: ForgotPasswordInput,
    metadata?: Metadata
  ): Observable<ForgotPassword>;
  resetPassword(
    input: ResetPasswordInput,
    metadata?: Metadata
  ): Observable<ResetPassword>;
  resetPasswordUpdate(
    input: ResetPasswordUpdateInput,
    metadata?: Metadata
  ): Observable<ResponseType>;
  login(data: LoginUserInput, metadata?: Metadata): Observable<User>;
}
