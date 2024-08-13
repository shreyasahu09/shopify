import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//Protected route token base
export const requireSignIn = async(req, res, next) => {
    try {
        // Ensure we're correctly accessing the Authorization header
        // and properly handling cases where it might not be present.
        if (!req.headers.authorization) {
            return res.status(401).send({
                success: false,
                message: 'No token provided.'
            });
        }
        const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        // Sending a response to avoid hanging the request
        return res.status(401).send({
            success: false,
            message: 'Token verification failed.'
        });
    }
};

//admin access
export const isAdmin = async(req,res,next)=> {
    try {
        const user=await userModel.findById(req.user._id)
        //if is not an admin
        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized Access'
            })
        }
        else{
            //allow access
            next();
        }
         
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message: "Error in admin middleware"
        })
        
    }
}