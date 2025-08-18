import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, myFriends, recommendedUsers, sendFriendRequest } from "../controllers/user.controller.js";

const router= express.Router();

router.use(protectRoute) //.. applies auth middleware to all the router below

router.get("/",recommendedUsers);
router.get("/friends", myFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);


export default router;