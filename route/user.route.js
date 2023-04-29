const express=require("express")
const {usermodel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
const userroute=express.Router()


userroute.post("/register",async(req,res)=>{
    const {name,email,password,age}=req.body
    
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            const user=new usermodel({name,email,password:hash,age})
            await user.save()
           
            res.status(200).send({"mag":"user has been added"})

            // Store hash in your password DB.
        });
        

    }catch(err)
    {
        res.status(400).send({"err":err.massage})
    }

})
userroute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await usermodel.findOne({email})
        if(user)
        {
            bcrypt.compare(password, user.password, function(err, result) {
                if(result)
                {
                    const  token = jwt.sign({ authorId:user._id,authorName:user.name}, 'dheeraj');
                   res.status(200).send({"mas":"you are login succesfull !!!","token":token})

                }else{
                    res.status(200).send({"mas":"check password"})
                }
                
                // result == true
            });
            
        }else{
            res.status(200).send({"mas":"check email"})
        }
    }catch(error)
    {
        res.status(400).send({"error":error.massage})

    }

})

module.exports={userroute}