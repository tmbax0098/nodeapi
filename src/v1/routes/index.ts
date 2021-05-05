import {Router} from "express";

import RoleController from "../controllers/RoleController";

const router = Router();

//routes
import authRoute from "./auth";
import userRoute from "./user";
import accountRoute from './account';
import pollRoute from "./poll";
import dashboardRoute from "./dashboard"

router.use(RoleController.decodeToken);

router.get("/version", (req, res) => {
    res.send("API version 1");
})
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/account", accountRoute);
router.use("/poll", pollRoute);
router.use("/dashboard", dashboardRoute);

export default router;
