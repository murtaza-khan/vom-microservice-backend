import { forwardRef, HttpException, HttpStatus, Inject, Injectable , Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from 'src/shared/types/groups';
import { UserService } from '../users/user.service';
import { GroupType } from './model/group.model';

@Injectable()
export class GroupsService {
    constructor(@InjectModel('Group') private readonly groupsModel: Model<GroupType>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService) { }

    async getGroups(): Promise<any[]> {
        Logger.log("get all groups");
        const groups =  await this.groupsModel.find();
        for(const group of groups){
            const user = await this.userService.getUsersByGroupId(group._id);
            group.users = user;
        }
        return groups;
    }

    async create(groupDTO: Group): Promise<any> {

        const name = groupDTO.name;
        const group = await this.groupsModel.findOne({ name });
        if (group) {
            Logger.log(`group alredy exist with name ${name}`);
            throw new HttpException(`group alredy exist with name ${name}`, HttpStatus.BAD_REQUEST);
        }
        groupDTO.createdAt = new Date().toISOString();
        const createdGroup = new this.groupsModel(groupDTO);
        Logger.log(`group create successfuly ${createdGroup._id}`);
        return await createdGroup.save();
    }


    async update(updateGroupDto:any) : Promise<any>{
        const id = updateGroupDto.id;
        const group = await this.groupsModel.findOne({_id:id});
        if(group){
            const updateUser = await this.groupsModel.findByIdAndUpdate(id , updateGroupDto , {new : true});
            Logger.log(`successfy update group again id ${id}`);
            return updateUser;
        }
        else{
            Logger.log(`Group is not exist against id ${id}`);
            throw new HttpException(`Group is not exist against id ${id}`, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteGroupById(id: string) {
        const group = await this.groupsModel.findOne({ _id: id });
        if (group === undefined || group === null) {
          Logger.log(`Group is not exist again id ${id}`);
          throw new HttpException(`Group is not exist against id ${id}`, HttpStatus.BAD_REQUEST);
        }
        Logger.log(`Group delete with id : ${id}`);
        const isDelete = await this.groupsModel.findByIdAndRemove(id);
        if(isDelete){
            return "SuccessFully Delete Group";
        }
    }

    async findGroupById(id:string): Promise<any>{
        try {
            const group = await this.groupsModel.findOne({_id : id});
            if (group === undefined || group === null) {
                Logger.log(`Group is not exist against id ${id}`);
                throw new HttpException(`Group is not exist against id ${id}`, HttpStatus.BAD_REQUEST);
            }
            Logger.log(`Find Group by id ${id}`);
            return group;
        }
        catch(error){
            throw new HttpException(error ,  HttpStatus.BAD_REQUEST);
        }
    }

}