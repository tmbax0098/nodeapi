import { Router } from "express";
import UserController from "../controllers/UserController";
import ServiceController from "../controllers/ServiceController";
import RoleController from "../controllers/RoleController";


const router = Router();

router.use(ServiceController.debug);
router.use(RoleController.isUser);

router.delete("/all", RoleController.isAdmin, UserController.removeAll);
router.get("/all", UserController.all);

router.get("/names", UserController.names);
router.get("/table", UserController.table);

router.delete("/info/:id", RoleController.isAdmin, UserController.remove);
router.get("/info/:id", UserController.one);

router.put("/:id", UserController.edit);

export default router;
