"use server";
import { connectToDB } from "../dbConnect";
import User from "@/models/user";


export const fetchUser = async(id)=>{
 try {
    await connectToDB();
    const user = await User.findById(id);
    return JSON.parse(JSON.stringify(user),{status:200});
 } catch (error) {
    console.log(error);
 }
}