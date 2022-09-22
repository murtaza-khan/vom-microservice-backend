import { Resolver } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';

@Resolver('Organization')
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  
}
