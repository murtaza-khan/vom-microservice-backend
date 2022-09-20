import {
  Injectable,
  HttpException,
  HttpStatus,
  ForbiddenException,
  Logger
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../shared/types/user';
import { CreateUserInput } from './dto/user.input';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRoles } from '../../shared/user-roles';
import { UserType } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserType>,
  ) { }

  async getUsers(): Promise<User[]> {
    Logger.log(`User retreieved successfully`);
    return await this.userModel.find();
  }

  async getUser(userId: any): Promise<UserType> {
    const id = userId;
    return await this.userModel.findOne({ _id: id });
  }

  async create(userDTO: User): Promise<UserType> {
    const { email } = userDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      Logger.log(`User already exists with email: ${email}`);
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(userDTO);
    Logger.log(`User Created with Data : ${createdUser}`);
    return await createdUser.save();
  }

  async findByLogin(userDTO: CreateUserInput) {
    const { email, password } = userDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      Logger.log(`Invalid credentials`);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      Logger.log(`Invalid credentials`);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async update(id: string, newUser: UpdateUserInput, role: UserRoles) {
    const user: User = await this.userModel.findOne({ _id: id });
    const userWithEmail = await this.userModel.findOne({
      email: newUser.email,
    });

    if (user === undefined || user === null) {
      throw new HttpException(`User doesn't exists`, HttpStatus.BAD_REQUEST);
    } else if (
      userWithEmail !== null &&
      userWithEmail !== undefined &&
      newUser.email !== user.email
    ) {
      throw new HttpException('Email is already used', HttpStatus.BAD_REQUEST);
    }

    if (
      role == UserRoles.EMPLOYEE &&
      newUser.userRole != user.userRole &&
      newUser.userRole != null &&
      newUser.userRole != undefined
    ) {
      throw new ForbiddenException("Normal users can't change roles");
    }

    let userRole: UserRoles;
    if (role === UserRoles.ADMIN) userRole = newUser.userRole;
    else if (role === undefined || role === null) user.userRole;
    else userRole = user.userRole;

    const updateUser: CreateUserInput = {
      email: newUser.email || user.email,
      password: newUser.password || user.password,
      userRole: userRole,
      firtName: newUser.firstName || user.firstName,
      lastName: newUser.lastName || user.lastName,
      phone: newUser.phone || user.phone,
      organization: newUser.organization || user.organization,
      groupId: newUser.organization || user.organization,
    };

    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      {
        // ...updateUser,
      },
      {
        new: true,
      },
    );

    return updatedUser;
  }

  async findByPayload(payload: any) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  async deleteUserById(id: string) {
    const user = await this.userModel.findOne({ _id: id });

    if (user === undefined || user === null) {
      Logger.log(`User doesn't exists : ${user}`);
      throw new HttpException(`User doesn't exists`, HttpStatus.BAD_REQUEST);
    }
    Logger.log(`User delete with id : ${id}`);
    return await this.userModel.findByIdAndRemove(id);
  }

  async deleteUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (user === undefined || user === null) {
      Logger.log(`User doesn't exists : ${user}`);
      throw new HttpException(`User doesn't exists`, HttpStatus.BAD_REQUEST);
    }
    Logger.log(`User delete with emaik : ${email}`);
    return await this.userModel.findOneAndDelete({ email });
  }

  async getUsersByOrgId(orgId: string) {
    const user = await this.userModel.findOne({ organization: orgId });

    if (user === undefined || user === null) {
      Logger.log(`User doesn't exists : ${user}`);
      throw new HttpException(`User doesn't exists`, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async getUsersByGroupId(groupId: string) {
    const user = await this.userModel.findOne({ groupId: groupId });

    if (user === undefined || user === null) {
      Logger.log(`User doesn't exists : ${user}`);
      throw new HttpException(`User doesn't exists`, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async createUserFromCSV(csvFileData: any) {
    let result: any;
    let failedToImport: any[] = [];
    let successImports: any[] = [];

    for (const singleUser of csvFileData) {
      try {
        singleUser.userRole = UserRoles.EMPLOYEE;
        singleUser.groupId = "null";
        const createdUser = new this.userModel(singleUser);
        result = await createdUser.save();
        if (result) {
          successImports.push(result);
        } else {
          failedToImport.push(singleUser);
        }
      }
      catch (error) {
        failedToImport.push({ user: singleUser, error: error });
        // throw new HttpException(error ,  HttpStatus.BAD_REQUEST);
      }
    }
    return {
      failedImports: failedToImport,
      successImports: successImports,
      status: true
    };

  }

}
