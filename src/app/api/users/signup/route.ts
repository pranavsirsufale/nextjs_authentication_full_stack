import { connectDB  } from "@/dbConfig/dbConfig";
import User from '@/models/user.model'
import { NextRequest , NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connectDB()

export async function POST(request : NextRequest){
    try {
        const reqbody = await request.json()
        const { username , email , password } = reqbody;
        // validation 

        console.log(reqbody);

        const userExists = await User.findOne(
            {
                $or : [ { username } , { email } ]
            }
        )

        if(userExists){
            return NextResponse.json({message : 'User already exists'}, {status : 400})
        }
        
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })

        const savedUser = await newUser.save()



        //todo send verification mail
        await sendEmail({email , emailType : 'VERIFY', userId : savedUser._id})


        return NextResponse.json({
            message : "User Registered successfully ",
            success: true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message} , {status : 500})
    }
}





