import {Router} from "express";
import mongoose from "mongoose";


const router = Router();

router.delete("/drop", (req, res) => {
    mongoose.connection.db.dropDatabase()
        .then(() => {
            res.send("OK");
        }).catch(error => {
        res.send(error.message);
    });
});

export default router;
