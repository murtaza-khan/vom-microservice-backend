import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from '@vom/common';
import { UserService } from '../users/user.service';
import { GroupType } from './model/group.model';
import { UserRoles } from '@vom/common';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class GroupsService {
    constructor(@InjectModel('Group') private readonly groupsModel: Model<GroupType>,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @Inject(forwardRef(() => OrganizationService)) private OrganizationService: OrganizationService) { }

    async getGroups(): Promise<any[]> {
        Logger.log("get all groups");
        const groups = await this.groupsModel.find();
        for (const group of groups) {
            const user = await this.userService.getUsersByGroupId(group.id);
            group.users = user;
            const manager = await this.userService.getSingleUser(group.managerId);
            group.manager = manager[0];
        }
        return groups;
    }
    async getSingleGroup(groupId: string) {
        Logger.log(`Get single group by id ${groupId}`);
        let group: any = await this.groupsModel.find({ _id: groupId });
        console.log(group)
        if (group) {
            const user = await this.userService.getUsersByGroupId(group[0].id);
            group[0].users = user;
            const manager = await this.userService.getSingleUser(group[0].managerId);
            group[0].manager = manager[0];
            return group;
        }
        else {
            Logger.log(`Invalid groupId ${groupId}`);
            throw new HttpException(`Invalid groupId ${groupId}`, HttpStatus.BAD_REQUEST);
        }
    }
    async getGroupByOrgId(orgId: string): Promise<any[]> {
        const oranization = await this.OrganizationService.getOrgById(orgId);
        if (oranization) {
            Logger.log("get groups by organization id");
            const groups = await this.groupsModel.find({ organizationId: orgId });
            for (const group of groups) {
                const user = await this.userService.getUsersByGroupId(group.id);
                group.users = user;
                const manager = await this.userService.getSingleUser(group.managerId);
                group.manager = manager[0];
            }
            return groups;
        }

    }

    async create(groupDTO: Group, currentUser: any): Promise<any> {
        const name = groupDTO.name;
        const group = await this.groupsModel.findOne({ name });
        if (group) {
            Logger.log(`group alredy exist with name ${name}`);
            throw new HttpException(`group alredy exist with name ${name}`, HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.getUsersByUserId(groupDTO.managerId);
        if (user.userRole != UserRoles.GROUP_MANAGER) {
            Logger.log(`Please Provide a valid managerId`);
            throw new HttpException(`Please Provide a valid managerId`, HttpStatus.BAD_REQUEST);
        }
        groupDTO.createdAt = new Date().toISOString();
        groupDTO.organizationId = currentUser.organization;
        const createdGroup = new this.groupsModel(groupDTO);
        Logger.log(`group create successfuly ${createdGroup._id}`);
        return await createdGroup.save();
    }


    async update(updateGroupDto: any): Promise<any> {
        if (updateGroupDto.managerId != undefined) {
            const user = await this.userService.getUsersByUserId(updateGroupDto.managerId);
            if (user.userRole != UserRoles.GROUP_MANAGER) {
                Logger.log(`Please Provide a valid managerId`);
                throw new HttpException(`Please Provide a valid managerId`, HttpStatus.BAD_REQUEST);
            }
        }
        const id = updateGroupDto.id;
        const group = await this.groupsModel.findOne({ _id: id });
        if (group) {
            const updateUser = await this.groupsModel.findByIdAndUpdate(id, updateGroupDto, { new: true });
            if (updateUser) {
                const user = await this.userService.getUsersByGroupId(updateUser.id);
                updateUser.users = user;
                const manager = await this.userService.getSingleUser(updateUser.managerId);
                updateUser.manager = manager[0];
                Logger.log(`successfy update group again id ${id}`);
                console.log("updateUser", updateUser);
                return updateUser;
            }
        }
        else {
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
        if (isDelete) {
            return "SuccessFully Delete Group";
        }
    }

    async findGroupById(id: string): Promise<any> {
        try {
            const group = await this.groupsModel.findOne({ _id: id });
            if (group === undefined || group === null) {
                Logger.log(`Group is not exist against id ${id}`);
                throw new HttpException(`Group is not exist against id ${id}`, HttpStatus.BAD_REQUEST);
            }
            Logger.log(`Find Group by id ${id}`);
            return group;
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

}