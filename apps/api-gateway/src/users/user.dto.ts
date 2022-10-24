import { EmailAddress } from "../graphql/typings"

export class UserDto {
  readonly id?: string
  readonly firstName?: string
  readonly lastName?: string
  readonly email?: string
  readonly password?: string
  readonly phone?: string
  readonly userRole?: string
  readonly organization?: string
  readonly groupId?: string
}