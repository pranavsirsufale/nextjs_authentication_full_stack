import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectDB()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const { email , password } = reqBody;

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({ message : "Enter Valid Email Address"}, { status : 400})
        }

        console.log(user);

        const isPassCorrect = await bcryptjs.compare(password,user.password)

        if(!isPassCorrect){
            return NextResponse.json({ message : "Enter Valid Password"}, { status : 400})
        }

        const tokenData = {
            id: user._id,
            username : user.username,
            email : user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{ expiresIn : '1d'})

        const response = NextResponse.json(
            { message : "Logged In successfully" , success : true}, 
            { status : 200}
        )
        
        response.cookies.set("token",token,{
            httpOnly : true
        })

        return response


    } catch (error:any) {
        return NextResponse.json({ error : error.message},{ status : 500})
    }
}