import {Router} from "express";
import UserController from "../controllers/UserController";
import ServiceController from "../controllers/ServiceController";

const router = Router();

router.use(ServiceController.debug);
router.use(ServiceController.accessUser);

router.delete("/all", UserController.removeAll);
router.get("/all", UserController.all);

router.get("/names", UserController.names);
router.get("/table", UserController.table);


router.delete("/info/:id", UserController.remove);
router.get("/info/:id", UserController.one);


export default router;