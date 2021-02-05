import { Router } from "express";
const router = Router();
import { authJwt, verifySignup } from '../middlewares'
import * as userCtrl from "../controllers/user.controller";


router.get('/getNews/:idUser', [authJwt.verifyToken], userCtrl.getNews)
router.get('/getInfo/', userCtrl.getInfoUser)
router.get('/getUser/', [authJwt.verifyToken], userCtrl.getUser)
router.get('/getUserById/:idUser', [authJwt.verifyToken], userCtrl.getUserById)
router.delete('/deleteNews/:idNews', [authJwt.verifyToken], userCtrl.deleteNews)
router.post('/createNew/:idUser', [authJwt.verifyToken], userCtrl.createNews)
router.get('/', [authJwt.verifyToken], userCtrl.getUser)
router.put('/:idUser', [authJwt.verifyToken], userCtrl.updateUser)
router.get('/:idRole', [authJwt.verifyToken], userCtrl.getRole)
router.post('/', userCtrl.postInfoUser)
router.put('/editNew/:idUser&:idNew', [authJwt.verifyToken], userCtrl.editNews)

export default router;