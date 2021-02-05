import { Router } from "express";
const router = Router();
import * as authCtrl from "../controllers/auth.controller";
import * as authJwt from "../middlewares/";


router.post('/signup', [authJwt.verifySignup.checkDuplicateEmail], authCtrl.signup)
router.post('/signin', authCtrl.signin)
router.post('/signOut/:idUser', authCtrl.signOut)

export default router;