import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/core/decorators/roles.decorator';
import { Group } from 'src/shared/types/groups';
import { UserRoles } from 'src/shared/user-roles';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GroupsService } from './groups.service';


@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)

@Resolver('Group')
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Roles(UserRoles.ADMIN)
  @Query()
  async groups(){
    return await this.groupsService.getGroups();
  }

  @Roles(UserRoles.ADMIN)
  @Mutation()
  async createGroup(@Args('groupData') groupData:Group){
    return await this.groupsService.create(groupData);
  }

  @Roles(UserRoles.ADMIN)
  @Mutation()
  async updateGroup(@Args('groupData') groupData:Group){
    return await this.groupsService.update(groupData);
  }


  @Roles(UserRoles.ADMIN)
  @Mutation()
  async deleteGroupById(@Args('groupId') groupId :string){
    return await this.groupsService.deleteGroupById(groupId);
  }



}
