import {Router} from "express";
import UserController from "../controllers/UserController";
import RoleController from "../controllers/RoleController";

const router = Router();


router.use(RoleController.debug);
router.use(RoleController.onlyTechnical);

router.delete("/all", UserController.deleteAll);
router.get("/all", UserController.all);

//TODO here must be complete
router.delete("/info/:id", UserController.deleteOne);
router.get("/info/:id", UserController.getOne);


export default router;