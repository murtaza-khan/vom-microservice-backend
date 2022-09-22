import * as mongoose from 'mongoose';
export const OrgSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    logo: { type: String, required: true },
    BN: { type: String, required: true },
    createdAt : { type: String, required: false },
});