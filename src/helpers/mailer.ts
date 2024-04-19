import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({email , emailType , userId}:any) => {
    try {

        
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken : hashedToken,
                    verifyTokenExpiry :  Date.now() + 3600000 
                }
            )
        } else if( emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken : hashedToken,
                    forgotPasswordTokenExpiry :  Date.now() + 3600000 
                }
            )
        } 


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "79761be1a8fe5e", //❌
              pass: "f7013bdf726f6e" // ☠
            }
          });


        const mailOptions = {
            from: 'pradiprane85@gmail.com', 
            to: email, 
            subject: emailType === "VERIFY" ? "Verify your email" : 'Reset Your Password' ,
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${emailType ===  'VERIFY' ? "verify your email" : 'reset your password'}
            or copy and past the link below in your browser <br /> ${process.env.DOAMIN}/verifyemail?token=${hashedToken}
            </p>`, 
          }

        
        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse


    } catch (error:any) {
        throw new Error(error.message)
    }
}


