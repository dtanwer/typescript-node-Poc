import e, { Request,Response } from "express";
import { deleteUserById, getUsers } from "../models/Users";

export const getAllUsers = async (req:Request,res:Response)=>{
    try {
        const users= await getUsers();
        return res.status(200).json(users).end();
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}

export const deleteUserbyId=async (req:Request,res:Response) => {
    try {
        const {id}=req.params;
        const user=await deleteUserById(id);
        return res.status(200).json(user).end();
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
    
}