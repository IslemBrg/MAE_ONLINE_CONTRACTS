import { MongoClient } from 'mongodb';
require("dotenv").config();

const jwt = require('jsonwebtoken')
const uri = "mongodb://localhost:27017/MAE";

export default async (req, res) =>{
    if (req.method=="POST"){res.status(405).json('invalid request method!')}
    else{
        const token = req.cookies.session_id

        if (token == null) {res.status(401).json(401)}
        else {

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {res.status(403).json(403)}
                MongoClient.connect(uri,(err,db)=>{
                    if (err) throw err
                    let currentDB = db.db("MAE")
                    //check if user exists in collection users
                    currentDB.collection("users").find({"CIN":user.CIN}).toArray((err,result)=>{
                        if (result.length>0){
                            res.status(200).json(result)
                        }else{
                            res.status(401).json(401)
                        }})
                })
            })
        }
    }
}