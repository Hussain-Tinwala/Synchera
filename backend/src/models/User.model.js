import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
    nativeLanguage: {
        type: String,
        default: "",
    },
    learningLanguage: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },

    // this field decide whether the user can visit other pages or not
    // this is by default false 
    // that's the reason we are having this field in the user signup model
    isOnboarded: {
        type: Boolean,
        default: false,
    },


    // only storing the id's of the friends
    // it's an array of objects referencing
    // to other user models
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]

}, { timestamps: true })


// hook for hashing the password using bcryptjs library

userSchema.pre("save", async function (next) {
    // is the password is not modified then don't hash it 
    // by runnning this function 
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();

    } catch (error) {
        next(error);


    }
})


// to be used in the login functionality
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", userSchema);
export default User;
