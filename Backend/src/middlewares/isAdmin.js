import { User } from "../models/user.model.js";


const isAdmin = async(req,res,next)=>{
      const {userId} = req.body;
    try {
        let user = await User.findOne({_id:userId});
        console.log("user ",user);

        if (user?.isAdmin !== true) {
            return res.status(501).json({message:"User is not Admin"})
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"Error in checking isAdmin"})
    }
}
export{
    isAdmin
}