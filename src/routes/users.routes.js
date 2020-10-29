import { Router } from 'express';       // Import Router for manage routes in app
const router = Router();

import * as userCtrl from '../controllers/users.controller';
import { authJwt, verifySignUp } from '../middlewares';

router.post('/', [ authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicatedUser, verifySignUp.checkRolesExist ], userCtrl.createUser);

export default router;