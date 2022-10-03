import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/core/decorators/roles.decorator';
import { CurrentUser } from 'src/core/decorators/user.decorator';
import { Organization } from 'src/shared/types/organization';
import { UserRoles } from 'src/shared/user-roles';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OrganizationService } from './organization.service';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver('Organization')
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Roles(UserRoles.AFFLIATE)
  @Query()
  async getOrgs(){
    return await this.organizationService.getOrgs();
  }

  @Roles(UserRoles.AFFLIATE)
  @Mutation()
  async createOrg(@Args("orgData") orgData : Organization,
  @CurrentUser() currentUser: any){
    orgData.affiliateId = currentUser._id;
    return await this.organizationService.createOrg(orgData);
  }

  @Roles(UserRoles.AFFLIATE)
  @Mutation()
  async editOrg(@Args("orgData") orgData: Organization){
    return await this.organizationService.editOrg(orgData);
  }

  @Roles(UserRoles.AFFLIATE)
  @Mutation()
  async deleteOrgById(@Args('orgId') orgId: string){
    return await this.organizationService.deleteOrgById(orgId);
  }

  @Roles(UserRoles.AFFLIATE)
  @Query()
  async getOrgsByAffiliateId(@Args("affiliateId") affiliateId:string){
    return await this.organizationService.getOrgsByAffiliateId(affiliateId);
  }
  
}
