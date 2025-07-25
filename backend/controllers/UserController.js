import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"




//user login
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"user not found!"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})

    }
    catch(error){
        return res.json({success:false,message:"error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_TOKEN)
}

//user registration
const registerUser = async (req,res)=>{
    const {name,password,email} = req.body;
    try{
        const exists = await userModel.findOne({email});
        //checking whether user is already exists or not
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Email you entered is incorrect!"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"set strong password."})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user = await newUser.save();

        const token = createToken(user._id)
        res.json({success:true,token});

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {loginUser,registerUser}