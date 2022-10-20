import { Observable } from 'rxjs'
import { Metadata } from '@grpc/grpc-js'

import { IId, IQuery, ICount } from '../commons/commons.interface'
import { ForgotPassword, ForgotPasswordInput, User, UsersConnection } from '../graphql/typings'
import { UserDto } from './user.dto'

interface UpdateUserInput {
  id: string
  data: UserDto
}

export interface IUsersService {
  find(query: IQuery, metadata?: Metadata): Observable<UsersConnection>
  findById(id: IId, metadata?: Metadata): Observable<User>
  findOne(query: IQuery, metadata?: Metadata): Observable<User>
  count(query: IQuery, metadata?: Metadata): Observable<ICount>
  create(input: UserDto, metadata?: Metadata): Observable<User>
  update(input: UpdateUserInput): Observable<User>
  destroy(query: IQuery, metadata?: Metadata): Observable<ICount>
  forgotPassword(input: ForgotPasswordInput, metadata?: Metadata): Observable<ForgotPassword>

}
