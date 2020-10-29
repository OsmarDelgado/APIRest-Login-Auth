import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const createUser = async (req, res) => {
    const { username, email, password, roles } = req.body;              // Get this data from req.body
    const newUser = new User({                                          // Create a new User from class User and encript password with encryptPassword
        username,
        email,
        password : await User.encryptPassword(password)
    });

    if(roles) {
        const foundRoles = await Role.find({ name : {$in : roles} });   // If user put a role then this role is searched in the db and return the role object 
        newUser.roles = foundRoles.map(role => role._id);               // Search in the foundRoles the id role and save in newUser.roles
    } else {
        const role = await Role.findOne({ name : "User" });             // If the role is not exist assign the User role
        newUser.roles = [role._id];                                     // Assign the role id to this new User
    }

    const savedUser = await newUser.save();                             // Save User in db
    //console.log(savedUser);
    
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {        // Create a JWT for the new user with its ID, the SECRET Key from config.js and expires in 24 hours (86400 sec)
        expiresIn : 86400       // 24hrs in seconds
    });

    res.json({token});                                                  // Return the generated token with JWT
};