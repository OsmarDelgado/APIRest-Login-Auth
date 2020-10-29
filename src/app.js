import express from 'express';                          // Import express module
import morgan from 'morgan';                            // Import morgan module
import pkg from '../package.json';                      // Import as pkg the package.json
import { createRoles } from './libs/initialSetup';      // Import createRoles from initialSetup

import usersRoutes from './routes/users.routes';        // Import users routes from users.routes
import productRoutes from './routes/products.routes';   // Import product routes from product.routes
import authRoutes from './routes/auth.routes'           // Import auth routes from auth.routes

const app = express();
createRoles();                                          // Create all default roles from initialSetup

app.set('pkg', pkg);                                    // Import data from package.json for get its information

app.use(morgan('dev'));                                 // This line show in console all requiest from the server
app.use(express.json());                                // Allow the app understand recive json from client

/**
 * Routes
 */

// GET home
app.get('/', (req, res) => {
    res.json({                                          // Show in client the name, author, description and version from package.json (pkg)
        application : app.get('pkg').name,
        author : app.get('pkg').author,
        description : app.get('pkg').description,
        version : app.get('pkg').version
    });
});

app.use('/api/products', productRoutes);                // Routes for products
app.use('/api/auth', authRoutes);                       // Routes for auth
app.use('/api/users', usersRoutes);                     // Routes for users

export default app;
