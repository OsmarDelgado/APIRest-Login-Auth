import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];                                    // Get a token from the client
        console.log(token);

        if(!token) return res.status(403).json({ message : "No token provided" });     // If token does not exist return a status 403

        const decoded = jwt.verify(token, config.SECRET);                               // If does exist then get the token
        req.userId = decoded.id;                                                        // Save the id of the token in req.userId
        
        const user = await User.findById(req.userId, { password : 0 });                 // Find user who have the id of the token
        if(!user) return res.status(404).json({ message : "User not found" });          // If the user does not exist return a status 404

        next();

    } catch(err) {
        return res.status(500).json({ message : "Unauthorized" });
    }
};

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);                       // Find the user and save in the const
    const roles = await Role.find({ _id: {$in : user.roles} });         // Find the user roles and save in the const
    
    for( let i = 0; i < roles.length; i++ ) {                           // Analyze array roles in the user
        if( roles[i].name === "Moderator" ) {                            // If in the array exist a role called "Moderator" continue to the next
            next();
            return;
        }
    }

    return res.status(403).json({ message : "Require Moderator Role" });    // If does no exist a role clled "Moderator" in user then response a status 403
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);                       // Find the user and save in the const
    const roles = await Role.find({ _id: {$in : user.roles} });         // Find the user roles and save in the const
    
    for( let i = 0; i < roles.length; i++ ) {                           // Analyze array roles in the user
        if( roles[i].name === "Admin" ) {                            // If in the array exist a role called "Moderator" continue to the next
            next();
            return;
        }
    }

    return res.status(403).json({ message : "Require Admin Role" });    // If does no exist a role clled "Moderator" in user then response a status 403
};