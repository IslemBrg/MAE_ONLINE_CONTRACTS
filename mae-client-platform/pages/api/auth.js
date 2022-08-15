import { MongoClient } from 'mongodb';
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
    const CIN=login.CIN
    const pass=login.pass
    MongoClient.connect(uri,(err,db)=>{
        if (err) throw err
        let currentDB = db.db("MAE")
        //check if user exists in collection users
        currentDB.collection("users").find({"CIN":CIN}).toArray((err,result)=>{
            if (result.length>0){
                if (result[0].Pass == pass){
                    console.log(result)
                    const userToken = jwt.sign({"CIN":CIN,"FirstName":result[0].FirstName,"LastName":result[0].LastName,"Mail":result[0].Mail}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'})
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