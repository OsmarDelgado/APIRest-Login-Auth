import { Router } from 'express';       // Import Router for manage routes in app
const router = Router();

import * as productsCtrl from '../controllers/products.controller';
import { authJwt } from '../middlewares'

/**
 * Routes
 */

// GET
router.get('/', productsCtrl.getProducts);                                  // Get all products
router.get('/:productId', productsCtrl.getProductById);                     // Get a product by ID

// POST
router.post('/', [ authJwt.verifyToken, authJwt.isModerator ], productsCtrl.createProducts);                 // Create a product and verify if the user is correctly authorized

// PUT
router.put('/:productId', [ authJwt.verifyToken, authJwt.isModerator ], authJwt.verifyToken, productsCtrl.updateProductById);     // Update a product by ID if the user is correctly authorized

// DELETE
router.delete('/:productId', [ authJwt.verifyToken, authJwt.isAdmin ], productsCtrl.deleteProductById);  // Delete a product by ID if the user is correctly authorized

export default router;