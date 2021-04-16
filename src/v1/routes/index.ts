import {Router} from "express";

import RoleController from "../controllers/RoleController";

const router = Router();

//routes
import authRoute from "./auth";
import userRoute from "./user";
import accountRoute from './account';

router.use(RoleController.decodeToken);
// router.use((req: any, res: any, next: any) => {
//     console.log("req.headers after decode : ", req.headers);
//     next();
// })
router.get("/version", (req, res) => {
    res.send("API version 1");
})
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/account", accountRoute);

export default router;