import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from '@vom/common';
import { OrgType } from './model/org.model';

@Injectable()
export class OrganizationService {

    constructor(@InjectModel('Organization') private readonly orgModel: Model<OrgType>){}

    async getOrgs(){
        const orgs = await this.orgModel.find();
        return orgs;
    }

    async createOrg(orgData: Organization) {
        const name = orgData.name;
        const org = await this.orgModel.findOne({ name: name });
        if (org) {
            Logger.log(`organization is already exist with name ${name}`);
            throw new HttpException(`organization is already exist with name ${name}`, HttpStatus.BAD_REQUEST);
        }
        orgData.createdAt = new Date().toISOString();
        const createdOrg = new this.orgModel(orgData);
        if (createdOrg) {
            Logger.log(`organization created successfully with id ${createdOrg._id}`);
            return await createdOrg.save();
        }
        else{
            Logger.log(`failed to create organization`);
            throw new HttpException(`failed to create organization`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async editOrg(orgData: any) {
        const id = orgData.id;
        try {
            const org = await this.orgModel.findOne({ _id: id });
            if (org) {
                const updateOrg = await this.orgModel.findByIdAndUpdate(id, orgData, { new: true });
                if (updateOrg) {
                    Logger.log(`Successfully update Organization with id ${id}`);
                    return updateOrg;
                } else {
                    Logger.log(`Failed to update organization against id ${id}`);
                    throw new HttpException(`Failed to update organization`, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            else {
                Logger.log(`Oranization is not esixt against id ${id}`);
                throw new HttpException(`Oranization is not esixt against id ${id}`, HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteOrgById(orgId:string){
        try{
            const org = await this.orgModel.findOne({_id : orgId});
            if(org){
                const isDeleted = await this.orgModel.findByIdAndRemove(orgId);
                if(isDeleted){
                    Logger.log(`organization deleted with id ${orgId}`);
                    return "Oranization deleted successfully";
                }
                else{
                    Logger.log(`Failed to delete Organization with id ${orgId}`);
                    throw new HttpException(`Failed to delete Organization` , HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            else{
                Logger.log(`organization is not exist againt id ${orgId}`);
                throw new HttpException(`organization is not exist againt id ${orgId}` , HttpStatus.BAD_REQUEST);
            }
        }
        catch(error){
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async getOrgsByAffiliateId(affiliateId:string){
        try {
            const org = await this.orgModel.findOne({ affiliateId : affiliateId });
            if (org) {
                return org;
            }
            else {
                Logger.log(`Organization is not exist against id ${affiliateId}`);
                throw new HttpException(`Organization is not exist against id ${affiliateId}`, HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }

    async getOrgById(orgId: string) {
        try {
            const org = await this.orgModel.findOne({ _id: orgId });
            if (org) {
                return org;
            }
            else {
                Logger.log(`Organization is not exist against id ${orgId}`);
                throw new HttpException(`Organization is not exist against id ${orgId}`, HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }

}
