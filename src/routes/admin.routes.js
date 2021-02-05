import { Router } from "express";
const router = Router()
import { authJwt, verifySignup } from '../middlewares'
import * as adminCtrl from "../controllers/admin.controller";

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], adminCtrl.getAllUsers);
router.post('/', [authJwt.verifyToken, verifySignup.checkDuplicateEmail], adminCtrl.createUser);
router.get('/getNews/', [authJwt.verifyToken], adminCtrl.getAllNew);
// router.post('/', adminCtrl.createUser);
router.post('/', adminCtrl.respuestaUser);
router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], adminCtrl.deleteUserById);

export default router;