import { Schema, model } from 'mongoose';

export const ROLES = [ "Admin", "Moderator", "User" ];

const roleSchema = new Schema({
    name : String
}, {
    versionKey : false
});

export default model('Role', roleSchema);