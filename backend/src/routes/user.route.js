import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { myFriends, recommendedUsers } from "../controllers/user.controller.js";

const router= express.Router();

router.use(protectRoute) //.. applies auth middleware to all the router below

router.get("/",recommendedUsers);
router.get("/friends", myFriends);

export default router;