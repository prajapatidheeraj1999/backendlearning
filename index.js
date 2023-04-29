const express =require("express")
const {connection}=require("./db")
const {userroute}=require("./route/user.route")
const {noteroute}=require("./route/node.route")
const {authorization} =require("./middleware/usermiddleware")
const cors = require('cors')
const jwt=require("jsonwebtoken")
const app=express()

app.use(express.json())
app.use(cors())
app.use("/user",userroute)
app.use(authorization)
app.use("/note",noteroute)

require("dotenv").config()
const port =process.env.port

app.listen(port,async()=>{
    try{
        await connection
        console.log("data base is connected"+port)

    }catch(err)
    {
        console.log(err)
        console.log("con't connect db")
    }
    console.log("server is running port number 8080")
})