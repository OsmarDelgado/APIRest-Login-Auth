import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username : {
        type : String,
        unique : true,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    roles : [{
        ref : "Role",                           // Ref is to relationate roles with the user
        type : Schema.Types.ObjectId            // Get the ID of the role from the db and is relationate one to many
    }]
}, {
    timestamps : true,                          // Timestamp create two fields (created_at and updated_at)
    versionKey : false
});

// Encrypt te password
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Compare passwords
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export default model('User', userSchema);