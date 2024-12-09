import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });
    }

    async sendOtpEmail(recipientEmail: string, otp: string) {
        try {
            const mailOptions = {
                from: process.env.NODEMAILER_EMAIL,
                to: recipientEmail,
                subject: 'Your OTP for registration',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px; border: 1px solid #e0e0e0;">
                        <div style="text-align: center; padding-bottom: 20px;">
                            <img src="https://example.com/logo.png" alt="Travel Easy Logo" style="width: 150px; height: auto;" />
                        </div>
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                            <h1 style="color: #2c3e50; text-align: center; font-size: 24px;">Welcome to Travel Easy</h1>
                            <p style="color: #34495e; font-size: 16px; text-align: center; margin: 10px 0;">Thank you for joining us! To complete your account registration, please use the OTP below. The OTP will expire in 1 minute.</p>
                            <div style="text-align: center; margin: 20px 0; padding: 10px; background-color: #f4f6f7; border-radius: 8px; display: inline-block;">
                                <p style="font-size: 28px; color: #16a085; font-weight: bold; margin: 0;">${otp}</p>
                            </div>
                            <p style="color: #7f8c8d; font-size: 14px; text-align: center;">If you did not request this OTP, please disregard this email.</p>
                        </div>
                        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #95a5a6;">
                            <p>© 2024 Travel Easy. All rights reserved.</p>
                            <p>Travel Easy, Explore Kerala Effortlessly!</p>
                        </div>
                    </div>
                `,
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ', info.response);
        } catch (error) {
            console.error('Error in sending OTP through email:', error);
            throw new Error('Failed to send OTP');
        }
    }
}


// import nodemailer from 'nodemailer'
// import dotenv from 'dotenv'


// dotenv.config()


// export class MailService{
    
//     private transporter;

//     constructor(){
//         this.transporter=nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 user:process.env.NODEMAILER_EMAIL,
//                 pass:process.env.NODEMAILER_PASSWORD
//             }
//         })
//     }


 
//     async sendOtpEmail(recipientEmail: string, otp: string) {
//         try {
//             const mailOptions = {
//                 from: process.env.NODEMAILER_EMAIL,
//                 to: recipientEmail,
//                 subject: 'Your OTP for registration',
//                 html: `
//                                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px; border: 1px solid #e0e0e0;">
//                     <!-- Logo Section -->
//                     <div style="text-align: center; padding-bottom: 20px;">
//                         <img src="https://example.com/logo.png" alt="Travel Easy Logo" style="width: 150px; height: auto;" />
//                     </div>

//                     <!-- Welcome Section -->
//                     <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
//                         <h1 style="color: #2c3e50; text-align: center; font-size: 24px;">Welcome to Travel Easy</h1>
//                         <p style="color: #34495e; font-size: 16px; text-align: center; margin: 10px 0;">Thank you for joining us! To complete your account registration, please use the OTP below. The OTP will expire in 1 minute.</p>
                        
//                         <!-- OTP Display -->
//                         <div style="text-align: center; margin: 20px 0; padding: 10px; background-color: #f4f6f7; border-radius: 8px; display: inline-block;">
//                             <p style="font-size: 28px; color: #16a085; font-weight: bold; margin: 0;">${otp}</p>
//                         </div>

//                         <p style="color: #7f8c8d; font-size: 14px; text-align: center;">If you did not request this OTP, please disregard this email.</p>
//                     </div>

//                     <!-- Footer Section -->
//                     <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #95a5a6;">
//                         <p>© 2024 Travel Easy. All rights reserved.</p>
//                         <p>Travel Easy, Explore Kerala Effortlessly!</p>
//                     </div>
//                 </div>

//                 `,
               
//             };
    
//             const info = await this.transporter.sendMail(mailOptions);
//         } catch (error) {
//             console.log('Error in sending OTP through email', error);
//             throw new Error('Failed to send OTP');
//         }
//     }
    
    


// }