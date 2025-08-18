import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests, myFriends, recommendedUsers, sendFriendRequest } from "../controllers/user.controller.js";

const router= express.Router();

router.use(protectRoute) //.. applies auth middleware to all the router below

router.get("/",recommendedUsers);
router.get("/friends", myFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

// in the notifications page user need to see which requests he's got
router.get("/friend-requests", getFriendRequests)
// Sender should not be able to resend th  request once the request is send
router.get("/outgoing-friend-requests", getOutgoingFriendRequests)


export default router;