import express from "express"
import connectDb from "./config/dbConfig.js"


//local imports
import authRoutes from "./Routes/authRoutes.js"
import errorHandler from "./middleware/errorHandler.js"
import adminRoutes from "./Routes/adimRoutes.js"

let app = express()
let PORT = process.env.PORT || 5000

connectDb()

//body Parser
app.use(express.json())
app.use(express.urlencoded())


// auth routes
app.use("/api/auth" , authRoutes )

//admin routes
app.use("/api/admin" , adminRoutes)

app.use(errorHandler)

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
    
})








