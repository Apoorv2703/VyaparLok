import jwt from "jsonwebtoken"
import User from "../Models/userModel.js";


let adminProtect = async (req, res, next) => {
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            let token = req.headers.authorization.split(' ')[1]
            console.log(token);
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded);
            let user = await User.findById(decoded.id).select("-password")
            

            if (!user) {
                res.status(400)
                throw new Error("You are not authorised : Invalid Token");

            }
           
            if(user.isAdmin){
                req.user = user
                 next()

            }else{
                 res.status(400)
                throw new Error("You are not authorised :Admin can access only ");

            }


           

        }

    } catch (error) {
        res.status(400)
       throw new Error("You are not authorised :Admin can access only ");


    }
}

export default adminProtect