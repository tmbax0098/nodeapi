import {Router} from "express";
import AccountController from "../controllers/AccountController";
import RoleController from "../controllers/RoleController";

const router = Router();

router.use(RoleController.onlyUser);

router.get("/profile", AccountController.get);
router.put("/profile", AccountController.set);


export default router;