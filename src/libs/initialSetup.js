import Role from '../models/Role'

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if(count > 0) return;           // If count is 0 does not nothing
        
        // Execute all this promises for get a better performance and create all roles mentionated below
        const values = await Promise.all([
            new Role ({ name: 'Admin' }).save(),
            new Role ({ name: 'Moderator' }).save(),
            new Role ({ name: 'User' }).save()
        ]);

        //console.log(values);
    } catch(err) {
        console.error(err);
    }
};