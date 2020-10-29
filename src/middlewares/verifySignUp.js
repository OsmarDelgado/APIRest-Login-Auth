import {ROLES} from '../models/Role';
import User from '../models/User';
//import Role from '../models/Role';

export const checkDuplicatedUser = async (req, res, next) => {
    const user = await User.findOne({ username : req.body.username });                      // Search user in db by username get from req.body.username
    if(user) return res.status(400).json({ message : "The user is already exist" });        // If user is found then return a status 400

    const email = await User.findOne({ email : req.body.email });                           // Search email in db by email get from req.body.email
    if(email) return res.status(400).json({ message : "The email is already exist" });      // If email is found then return a status 400

    next();
};

export const checkRolesExist = /*async*/ (req, res, next) => {
    if(req.body.roles) {                                                                                    // If exist roles in the req.body.roles
        for( let i = 0 ; i < req.body.roles.length ; i++ ) {                                                // Analyze the array roles 
            //const roles = await Role.findById()
            //if(roles)
            if( !ROLES.includes(req.body.roles[i]) ) {                                                      // If some roles does not exist
                return res.status(400).json({ message : `Role ${ req.body.roles[i] } does not exist` });    // Return status 400
            }
        }
    }
    
    next();
};