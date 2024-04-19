import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB()


export async function POST(request : NextRequest){
    try {
        //todo extract data from token
        const userId = await getDataFromToken(request)
        const user = await User.findById(userId).select({password : 0})

        //check if there is no user
        if(!user){
            return NextResponse.json({message : "Invalid Token"},{status : 400})
        }

        return NextResponse.json({message : "User found ",data : user},{status : 200})

    } catch (error : any) {
        return NextResponse.json({message : error.message}, { status : 400})
    }
}