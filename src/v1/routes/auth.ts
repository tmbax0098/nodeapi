import {Router} from "express";
import AuthController from "./../controllers/AuthController";

const router = Router();

router.put("/signup", AuthController.create);
router.post("/signin", AuthController.login);
router.get("/signout", AuthController.logout);
router.get("/confirm/accept/:token", AuthController.confirmAccept);
router.get("/confirm/reject/:token", AuthController.confirmReject);

router.get("/all/confirm", AuthController.allConfirm);
router.get("/all", AuthController.all);

export default router;