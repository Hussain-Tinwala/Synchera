import User from "../models/User.model.js";
import FriendRequest from "../models/FriendRequest.model.js";

export const recommendedUsers= async(req, res)=>{
    try {
        const currentUsrId=req.user.id;
        // cosnt currentUsr=await User.findById(currentUsrId)
        const currentUsr=req.user;

        const recommendUsers=await User.find({
            $and:[
                {_id: {$ne: currentUsrId}},// exclude crnt user
                {_id: {$nin: currentUsr.friends || [] }}, // exclude crnt user's friends
                {isOnboarded: true}
            ]
        })

        res.status(200).json(recommendUsers)
    } catch (error) {
        console.error("Error in recommendedUsers controller", error.message)
        res.status(500).json({message: "Interenal Server Error"})

    }

}

export const myFriends= async(req, res)=>{
    try {
        const user= await User.findById(req.user.id)
                        .select("friends")
                        .populate("friends", "fullName profilePic nativeLanguage learningLanguage")
                        // select only gives the id's 
                        // but populate method is used to get the extra fields 
                        // from that particular friends

        res.status(200).json(user.friends);
        
    } catch (error) {
        console.error("Error in myFriends controller", error.message)
        res.status(500).json({message: "Interenal Server Error"})
    }
        
    

}

export const sendFriendRequest=async(req, res)=>{
    try {
        const myId=req.user.id;
        const {id: receieverId}=req.params;

        if(myId===receieverId) return res.status(400).json({message: "You can't send friend request to yourself"})
        
        const receiver=await User.findById(receieverId);
        if(!receiver)
        {
            return res.status(404).json({message: "Receiver not Found"})

        }
        
        // check if a user is already friend
        if(receiver.friends.includes(myId))
        {
            return res.status(400).json({message: "Already friends"})
        }


        //check if a req already exists
        const existingRequest= await FriendRequest.findOne({
            $or:[
                {sender: myId, receiver: receieverId},
                {sender: receieverId, receiver: myId},
            ],

        })

        if(existingRequest)
        {
            return res.status(400).json({message: "A friend request already exists between you and this user"})
        }

        const friendRequest=await FriendRequest.create({
            sender: myId,
            receiver: receieverId,
        })

        res.status(201).json(friendRequest)

        
    } catch (error) {
        console.error("Error in sendFriendRequest controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    
    }
}