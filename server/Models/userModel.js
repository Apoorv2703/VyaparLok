import mongoose from "mongoose";

let userSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : [true , "Please Fill Name"]
    },
    email : {
         type : String ,
         unique : true ,
        required : [true , "Please Fill Email"]
    },
    phone : {
         type : String ,
        required : [true , "Please Fill Phone Number"]
    },
    password : {
         type : String ,
        required : [true , "Please Fill Password"]
    },
    address : {
         type : String ,
        required : [true , "Please Fill Address"]
    },
    isAdmin : {
         type : Boolean,
         default : false ,
        required : true
    },
    isShopOwner : {
         type : Boolean,
         default : false ,
        required : true 
    },
    isActive : {
         type : Boolean,
         default : true,
        required : true 
    }


},{
    timestamps : true
})

let User = mongoose.model("User" , userSchema)

export default User

