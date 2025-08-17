import User from "../models/User.model.js";

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