const express=require("express")
const {notemodel} =require("../model/node.model")
const { usermodel } = require("../model/user.model")
const noteroute=express.Router()

noteroute.post("/create",async(req,res)=>{
    try{
        const nodeuser=new notemodel(req.body)
        await nodeuser.save()
        res.status(200).send({"mag":"note is added"})


    }catch(err)
    {
        res.status(400).send({"err":"something is worng"})
        
    }
})

noteroute.get("/",async(req,res)=>{

    try{
        const userdata=await notemodel.find({authorId:req.body.authorId})
        res.status(200).send(userdata)

    }catch(err)
    {
        res.status(400).send({"err":"not geting any data of note"})

    }
    
    
})

noteroute.patch("/update/:noteid",async(req,res)=>{
    try{
        const id=req.params.noteid
        const userdata=await notemodel.findOne({_id:id})
        console.log(userdata)
        if(req.body.authorId!==userdata.authorId)
        {
            console.log(req.body.authorId,userdata.authorId)
            res.send({"err":"you have not athority to updata"})

        }else{
            const updatedata=await notemodel.findByIdAndUpdate({_id:id},req.body,{new:true})
        if(updatedata)
        {
            res.status(200).send({"mag":"data has been change"})
        }else{
            res.send({"err":"something is wrong"})
        }

        }
        

    }catch(err){
        res.status(400).send({"Err":err.massage})

    }

    
})

noteroute.delete("/delet/:noteid",async(req,res)=>{
    let id=req.params.noteid

    try{
        console.log(id)
        const userdata=await notemodel.findOne({_id:id})
        if(req.body.authorId!==userdata.authorId)
        {
            console.log(req.body.authorId,userdata.authorId)
            res.send({"err":"you have not athority to delete"})

        }else{
        
        const nodedata=await notemodel.findOneAndDelete({_id:id})
        console.log(nodedata)
        if(nodedata)
        {
            res.status(200).send({"mag":"data has been deleted"})
        }else{
            res.send("something is wrong")
        }
    }


    }catch(err)
    {
        res.status(400).send({"err":err.massage})

    }


    
})
module.exports={noteroute}
