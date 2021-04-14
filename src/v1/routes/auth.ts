import { Router} from "express";
import AuthController from "./../controllers/AuthController";

const router = Router();


router.put("/signup" ,AuthController.create);

router.post("/signin" , (req , res)=>{

})

router.get("/all" , AuthController.all);

export default router;