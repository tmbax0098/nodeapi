import {Router} from "express";
import DashboardController from "../controllers/DashboardController";
import RoleController from "../controllers/RoleController";

const router = Router();


router.get("/", RoleController.isMember, DashboardController.dashboard);


export default router;
