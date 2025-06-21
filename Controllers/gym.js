const Gym = require('../Modals/gym');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


exports.register = async (req, res) => {
    try {
        const { userName, password, gymName, profilePic, email } = req.body;

        const isExist = await Gym.findOne({userName});

        if (isExist) {
            res.status(400).json({ 
                error: 'Username already exists, please try another one'
            })
        }else {
            const hashedPassword = await bcrypt.hash(password, 10);
            // cosole kya hai idher encrypted password
            console.log(hashedPassword);
            const newGym = new Gym({
                userName,
                password : hashedPassword,
                gymName,
                profilePic,
                email
            });

            await newGym.save();
            res.status(201).json({ 
                message: 'Gym registered successfully',
                success: "yes",
                data: newGym
            });
        }
    } catch (err) {
        res.status(500).json({ 
            error: 'Server error'
        });
        
    }
}

exports.login = async (req, res) => {
    try{
        const { userName, password } = req.body;


        const gym = await Gym.findOne({ userName });
        if (gym && await bcrypt.compare(password, gym.password)) {
            // Password matches, login successful
                res.json({
                message: 'Login successful',
                success: "ture",
                gym
            });
        }else{   
            res.status(400).json({
                error: 'Invalid username or password'
            }); 
        }
    }catch (err) {
        res.status(500).json({ 
            error: 'Server error'
        });
    }

} 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD // Your email password or app password
    }
})

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const gym = await Gym.findOne({ email });
        if (gym) {
            // Generate a random 6-digit OTP
            const buffer = crypto.randomBytes(4); // 3 bytes = 6 hex digits
            const token = buffer.readUInt32BE(0) % 900000 + 100000; // Ensure it's a 6-digit number
            gym.resetPasswordToken = token;
            gym.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
            await gym.save();
            // Here you would send the OTP to the gym's email
            // for email sending, you can use nodemailer or any other email service
            const mailOptions ={
                from: "memonhuzaifa740@gmail.com",
                to: email,
                subject: "Gym Reset Password OTP",
                text: `Your OTP for resetting your password is ${token}. It is valid for 1 hour.`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({ 
                        error: 'Error sending OTP email',errorMsg: error
                    });
                } else {
                    res.status(200).json({ 
                        message: 'OTP sent successfully'
                    });
                }
            });

        }else{
            return res.status(400).json({ 
                error: 'Gym not found with this email'
            });
        }


    } catch (err) {
        res.status(500).json({ 
            error: 'Server error'
        });
    }
}

exports.checkOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const gym = await Gym.findOne({ 
            email,
            resetPasswordToken: otp,
            resetPasswordExpires: { $gt: Date.now() } // Check if the token is still valid  
        });

        if(!gym){
            res.status(400).json({ 
                error: 'Otp Invalid or expired OTP'
            });
        }
        res.status(200).json({ 
            message: 'Otp is valid',
        });

    }catch (err) {
        res.status(500).json({ 
            error: 'Server error'
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
       const { email,newPassword } = req.body;

        const gym = await Gym.findOne({email});

        if(!gym){
            return res.status(400).json({ 
                error: 'Some error occurred, please try again'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        gym.password = hashedPassword;
        gym.resetPasswordToken = undefined; // Clear the token
        gym.resetPasswordExpires = undefined; // Clear the expiration time
        await gym.save();
        res.status(200).json({ 
            message: 'Password reset successfully'
        });

    } catch (err) {
        res.status(500).json({ 
            error: 'Server error'
        });
    }
}