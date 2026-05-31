export const sendToken=async(user, statusCode,res,message)=>{
    const token = await user.getJWTToken();
    const options={
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRE * 24 *60 * 60 * 1000
        ),
        httpOnly:true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
    }
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        message,
        token,
    });
};