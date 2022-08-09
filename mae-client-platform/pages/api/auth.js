import mongodb, { MongoClient } from 'mongodb';
import cookie from 'cookie'

require("dotenv").config();
const jwt = require('jsonwebtoken')
const uri = "mongodb://localhost:27017/MAE";



export default async (req, res) =>{
    if (req.method=="GET"){
        res.status(405).json('invalid request method!')
    }
    else {
    const login=JSON.parse(req.body)
    const mail=login.login
    const pass=login.pass
    MongoClient.connect(uri,(err,db)=>{
        if (err) throw err
        let currentDB = db.db("MAE")
        //check if collection already exists
        currentDB.collection("users").find({"mail":mail}).toArray((err,result)=>{
            if (result.length>0){
                if (result[0].pass == pass){
                    const userToken = jwt.sign({mail}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'})
                    res.setHeader('Set-Cookie', cookie.serialize('session_id',userToken,{
                        httpOnly: true,
                        sameSite: 'strict',
                        maxAge: 3600,
                        path:'/'
                    }))
                    res.status(200).json(200)
                }
                else {res.status(401).json(401)}
            }else{
                res.status(401).json(401)
            }
        })
    })
    }
}