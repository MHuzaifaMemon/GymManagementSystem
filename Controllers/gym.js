const Gym = require('../Modals/gym');
const bcrypt = require('bcryptjs');



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