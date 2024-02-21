import {Router} from 'express';
import { userController } from '../controllers/user.controller.js';
import { jwtValidation } from '../middlewares/jwt.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router =new Router();

router.get('/:idUser',jwtValidation,authMiddleware(["ADMIN"]),
    userController.getUser);

router.post("/",userController.create);    
router.post("/sendmail",userController.sendmail);
router.get("/premium/:uid",userController.premium);
router.post("/reestablecer-con-envio-mail",userController.reestablecer);
router.post("/reestablecer-sin-envio-mail",userController.reestablecerSinMail);
export default router;