import { Request,Response } from "express";
import { createUser, getUserByEmail } from "../models/Users";
import { authentication, random } from "../utils/authHelper";

export const login = async (req:Request,res:Response)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.sendStatus(400);
        }

        const user= await getUserByEmail(email).select("+authentication.salt +authentication.password");
        if(!user){
            return res.sendStatus(400);
        }
        const expectedHash=authentication(user.authentication.salt,password);
        if(user.authentication.password !== expectedHash){
            return res.sendStatus(403);
        }
        const salt=random();
        user.authentication.sessionToken=authentication(salt,user._id.toString());
        await user.save();

        res.cookie("sessionToken",user.authentication.sessionToken,{ domain: "localhost", path: "/"})

        return res.status(200).json(user).end();


        return res.status(200).json(user).end();
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }

}
export const register = async (req:Request,res:Response)=>{
    try {
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.sendStatus(400);
        }

        const existingUser= await getUserByEmail(email);
        if(existingUser){
            return res.sendStatus(400);
        }

        const salt=random();
        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password:authentication(salt,password),
            }
        })


        return res.status(200).json(user).end();
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}

export const apiCheck=(req:Request,res:Response)=>{
    return res.status(200).json({message:"success"}).end();
}