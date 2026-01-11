import jwt from "jsonwebtoken"
import User from "../Models/userModel.js";


let protect = async (req, res, next) => {
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
            req.user = user


            next()

        }

    } catch (error) {
        res.status(400)
        throw new Error("You are not authorised");


    }
}

export default protect