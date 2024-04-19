import { NextRequest , NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/models/user.model";


export const getDataFromToken = async (request : NextRequest) => {
    try {
        const  token  = request.cookies.get("token")?.value || ""

        const decodedToken:any = jwt.verify( token ,process.env.TOKEN_SECRET!)

        return decodedToken.id

    } catch (error:any) {
        return NextResponse.json({message : error.message},{status : 400})
    }
}