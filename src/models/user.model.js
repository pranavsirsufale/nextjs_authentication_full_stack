import mongoose , { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : [true , 'Plese provide a username '],
            unique : true
        },
        email : {
            type : String,
            required : [true , 'Plese provide an eamil '],
            unique : true
        },
        password : {
            type : String,
            required : [true , 'Plese provide a password '],
        },
        isVerified : {
            type : Boolean,
            default : false
        },
        isAdmin : {
            type : Boolean,
            default : true
        },
        forgotPasswordToken : String,
        forgotPasswordTokenExpiry : Date,
        verifyToken : String,
        verifyTokenExpiry : Date
    },
    {
        timestamps: true
    }
)


const User = mongoose.models.users || mongoose.model('users',userSchema)

export default User 