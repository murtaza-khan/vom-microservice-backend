import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Organization } from 'src/shared/types/organization';
import { OrganizationService } from './organization.service';

@Resolver('Organization')
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query()

  async getOrgs(){
    return await this.organizationService.getOrgs();
  }

  @Mutation()
  async createOrg(@Args("orgData") orgData : Organization){
    return await this.organizationService.createOrg(orgData);
  }

  @Mutation()
  async editOrg(@Args("orgData") orgData: Organization){
    return await this.organizationService.editOrg(orgData);
  }

  @Mutation()
  async deleteOrgById(@Args('orgId') orgId: string){
    return await this.organizationService.deleteOrgById(orgId);
  }

  @Query()
  async getOrgsByAffiliateId(@Args("affiliateId") affiliateId:string){
    console.log("affiliateId", affiliateId);
  }
  
}
