import {Router} from "express";
import AuthController from "./../controllers/AuthController";
import RoleController from "../controllers/RoleController";

const router = Router();


router.put("/signupTechnical", RoleController.isGuest, AuthController.createTechnical);
router.put("/signupAdmin", RoleController.isGuest, AuthController.createAdmin);
router.put("/signup", RoleController.isGuest, AuthController.createUser);
router.post("/signin", RoleController.isGuest, AuthController.login);
router.get("/signout", AuthController.logout);
router.get("/confirm/accept/:token", RoleController.isGuest, AuthController.confirmAccept);
router.get("/confirm/reject/:token", RoleController.isGuest, AuthController.confirmReject);

export default router;
