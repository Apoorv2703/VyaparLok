import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

import User from "../Models/userModel.js";



export let registerUser = async(req , res)=>{

    let {name, email , phone , password , address } = req.body

    if(!name || !email || !phone || !password || !address){
       res.status(409)
        throw new Error("Please Fill All Details");
       
    }

    let emailExist = await User.findOne({email : email})
    let phoneExist = await User.findOne({phone : phone})

    //check if User already Exist
    if(emailExist || phoneExist){
        res.status(409)
        throw new Error("User Already Exist");
        
    }

    //hash Password
    let salt = bcrypt.genSaltSync(10)
    let hashedPassword = bcrypt.hashSync(password , salt)

    //create USer

    let user = await User.create({name , email , phone , password : hashedPassword , address})

    if(!user){
        res.status(409)
        throw new Error("User Not Created");
        
    }

    res.status(201).json({
        _id : user._id,
        name : user.name ,
        email : user.email,
        phone : user.phone ,
        address : user.address ,
        token : generateToken(user._id)
       
    })


   
}

export let loginUser = async(req , res)=>{
   let {email ,  password} = req.body

   if(!email || !password){
    res.status(400)
    throw new Error("Please fill all details");
    
   }
//find User
   let loginUser = await User.findOne({email})

   if(loginUser && await bcrypt.compare(password , loginUser.password)){
    res.status(200).json({
        id : loginUser._id,
        name : loginUser.name,
        email : loginUser.email,
        token : generateToken(loginUser._id)
    })
   }else{
    res.status(400)
    throw new Error("Invalid Credentials");
    
   }


}

//private Controller

let privateAccess = (req , res)=>{
    console.log(req.user);
    
    res.json({
        message : `request is made by : ${req?.user?.name}`
    })

}

let generateToken = (id)=>{
    let token = jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '30d'})
    return token
}

let authControllers = {registerUser , loginUser , privateAccess}

export default authControllers