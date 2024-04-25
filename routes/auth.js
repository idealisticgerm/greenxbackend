import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../Controllers/authController.js";
import { requireSignin } from "../middlewares/authMiddleware.js";


// ** router
const router = express.Router();

// ** routing

// ** REGISTER || METHOD POST
router.post("/register", registerController);

// ** LOGIN || METHOD POST
router.post("/login", loginController);


// protected route 



router.get("/user-auth", requireSignin, (req,res)=>{
res.status(200).send({ok:true})
})
export default router;
