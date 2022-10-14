import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Group } from '@vom/common';
import { GroupsService } from './groups.service';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRoles } from '@vom/common';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../core/decorators/user.decorator';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver('Group')
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) { }

  @Roles(UserRoles.ADMIN)
  @Query()
  async groups() {
    return await this.groupsService.getGroups();
  }
  @Roles(UserRoles.ADMIN)
  @Query()
  async getGroupByOrgId(@Args('orgId') orgId: any) {
    return await this.groupsService.getGroupByOrgId(orgId);
  }

  @Roles(UserRoles.ADMIN)
  @Mutation()
  async createGroup(@Args('groupData') groupData: Group, @CurrentUser() currentUser: any) {
    return await this.groupsService.create(groupData , currentUser);
  }

  @Roles(UserRoles.ADMIN)
  @Mutation()
  async updateGroup(@Args('groupData') groupData: Group) {
    return await this.groupsService.update(groupData);
  }


  @Roles(UserRoles.ADMIN)
  @Mutation()
  async deleteGroupById(@Args('groupId') groupId: string) {
    return await this.groupsService.deleteGroupById(groupId);
  }



}
