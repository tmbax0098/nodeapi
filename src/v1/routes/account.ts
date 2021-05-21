import { uploadAvatar } from './../controllers/AccountController';
import {Router} from "express";
import AccountController from "../controllers/AccountController";
import RoleController from "../controllers/RoleController";

const router = Router();

router.use(RoleController.onlyUser);

router.get("/profile", AccountController.get);
router.put("/profile", AccountController.set);

router.post("/avatar", uploadAvatar.single("avatar"), AccountController.saveAvatar);
router.get("/avatar", AccountController.takeAvatar);


export default router;