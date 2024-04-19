import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connectDB()


export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)

        const user = await User.findOne(
            {
                verifyToken: token,
                verifyTokenExpiry : {
                    $gt : Date.now()
                }
            }
        )

        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }

        console.log(user);
        
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        const verifiedUser = await user.save()

        return NextResponse.json(
            {message : "email Verified Successfully" , success: true , verifiedUser },
            {status : 200}
        )

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status : 500})
    }
}




