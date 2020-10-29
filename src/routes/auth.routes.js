import { Router } from 'express';       // Import Router for manage routes in app
const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import { verifySignUp } from '../middlewares';

router.post('/signup', [ verifySignUp.checkDuplicatedUser, verifySignUp.checkRolesExist ], authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

export default router;