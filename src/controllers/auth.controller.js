import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

// Create a new User and get all data from req.body for save information
export const signUp = async (req, res) => {
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
}

export const signIn = async (req, res) => {
    const userFound = await User.findOne({ email : req.body.email }).populate("roles");                 // Search the user how want signIn and populate the roles with the complete data
    if(!userFound) return res.status(400).json({ message : "User nor found" });                         // If the user is not found return a status 400

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);            // Compare the password write by the user and the password stored in the db
    if(!matchPassword) return res.status(401).json({ token : null, message : "Invalid password" });     // If the password does not match return "Invalid password"

    const token = jwt.sign({ id : userFound._id }, config.SECRET, {                                     // In case the password is correct generate a token by jwt and this token expires in a day (24hrs)
        expiresIn : 86400       // 24 hours
    });
    res.json({ token });                                                                                // Send token via json
}