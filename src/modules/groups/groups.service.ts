import { HttpException, HttpStatus, Injectable , Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from 'src/shared/types/groups';
import { GroupType } from './model/group.model';

@Injectable()
export class GroupsService {
    constructor(@InjectModel('Group') private readonly groupsModel: Model<GroupType>) { }

    async getGroups(): Promise<any[]> {
        Logger.log("get all groups");
        return await this.groupsModel.find();
    }

    async create(groupDTO: Group): Promise<any> {
        const name = groupDTO.name;
        const group = await this.groupsModel.findOne({ name });
        if (group) {
            Logger.log(`group alredy exist with name ${name}`);
            throw new HttpException(`group alredy exist with name ${name}`, HttpStatus.BAD_REQUEST);
        }
        const createdGroup = new this.groupsModel(groupDTO);
        Logger.log(`group create successfuly with data ${groupDTO}`)
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
          throw new HttpException(`Group is not exist again id ${id}`, HttpStatus.BAD_REQUEST);
        }
        Logger.log(`Group delete with id : ${id}`);
        const isDelete = await this.groupsModel.findByIdAndRemove(id);
        if(isDelete){
            return "SuccessFully Delete Group";
        }
      }

}
