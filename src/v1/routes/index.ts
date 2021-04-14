import {Router} from "express";

const router = Router();

//routes
import authRoute from "./auth";

router.get("/version", (req, res) => {
    res.send("API version 1");
})

router.use("/auth", authRoute);

export default router;