
const jwt = require('jsonwebtoken')

const authorization=(req,res,next)=>{
    const token=req.headers?.authorization
    if(token)
    {
        const decoded = jwt.verify(token, 'dheeraj')
        if(decoded)
        { req.body.authorId=decoded.authorId
            req.body.authorName=decoded.authorName
            console.log(decoded)
            console.log("middile ware is working properly")
            next()

        }

    }else{
        res.send({"mas":"pls login first"})
    }



}
module.exports={authorization}