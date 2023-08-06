const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger=require("../utils/logger.js")

const secretKey = "AmitKumar";

const registerUser = async (req, res) => {
    try {
        const body = req.body;
        if (!body.name || !body.email || !body.password) {
            return res.status(401).json({
                status: false,
                message: "given data in incomplete"
            });
        }
        const userDetials = {
            name: body.name,
            email: body.email,
        }
        //bcrypt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(body.password, salt)

        userDetials.password = passwordHash;

        const newUser = new User(userDetials);
        const result = await newUser.save();


        res.json({
            status: true,
            message: "User Register Successfully",
            result
        });
    } catch (err) {
        res.status(404).json({
            status: false,
            message: "Something went wrong try again"
        })
    }

};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: false,
                message: "email or password missing"
            })
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            logger.info("Login Failed", {timeStamp :new Date() ,reason:"User Does not exist", email:email})
            return res.status(401).json({
                statue: false,
                message: "User Not Found"
            });
        }
        const isPermit = await bcrypt.compare(password, user.password);
        if (!isPermit) {
            logger.info("Login Failed", {timeStamp :new Date() ,reason:"Wrong password", email:email})
            return res.status(400).json({
                status: false,
                message: "wrong password" 
            })
        }
        // logger
        logger.info("User LOGIN SUCCESSFULLY", {timeStamp :new Date() , email:user.email})


        //jwt
        const payload = {
            _id: user._id,
            email: user.email,
            exp: Math.floor((Date.now() / 1000) + 3600),
        };
        const token = jwt.sign(payload, secretKey);
        //update the token yo db
        await User.findByIdAndUpdate(user._id, { token: token });


        res.json({
            status: true,
            meassage: "Login successful",
            token: token


        })
    } catch (err) {
        res.status(404).json({
            status: false,
            message: "Something went wrong try again"
        })
    }

};

const logoutUser = async (req, res, next) => {
    try {
        const decodedToken = await jwt.decode(req.headers.authorization);
        await User.findByIdAndUpdate(decodedToken._id, { token: "" });
        logger.info("LOGGED OUT SUCCESSFULLY", {timeStamp : new Date() , email:decodedToken.email})
        res.json({
            status: true,
            message: "User Logged Out Successfully"
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
        })
    }

}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}