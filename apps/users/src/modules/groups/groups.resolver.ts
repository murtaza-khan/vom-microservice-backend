import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Group } from '@vom/common';
import { GroupsService } from './groups.service';

@Resolver('Group')
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query()
  async groups(){
    return await this.groupsService.getGroups();
  }

  @Mutation()
  async createGroup(@Args('groupData') groupData:Group){
    return await this.groupsService.create(groupData);
  }

  @Mutation()
  async updateGroup(@Args('groupData') groupData:Group){
    return await this.groupsService.update(groupData);
  }


  @Mutation()
  async deleteGroupById(@Args('groupId') groupId :string){
    return await this.groupsService.deleteGroupById(groupId);
  }



}
