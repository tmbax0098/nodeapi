import {Router} from "express";
import PollController from "../controllers/PollController";
import RoleController from "../controllers/RoleController";

const router = Router();


router.get("/info/:userId/:id", RoleController.isMember, PollController.one);
router.get("/all/:userId", RoleController.isMember, PollController.all);

router.post("/", PollController.create);


export default router;
