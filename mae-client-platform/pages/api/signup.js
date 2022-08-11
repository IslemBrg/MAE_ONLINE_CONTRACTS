import { MongoClient } from "mongodb"

const fs = require("fs")
const uri = "mongodb://localhost:27017/MAE"

export default async (req, res) =>{
    if (req.method=="GET"){res.status(405).json('invalid request method!')}
    else{
    const login=JSON.parse(req.body)
    const CIN=login.CIN
    const FirstName=login.FirstName
    const LastName=login.LastName
    const mail=login.mail
    const pass=login.pass


    MongoClient.connect(uri,(err,db)=>{
        if (err) throw err
        let currentDB = db.db("MAE")
        //check if user exists in collection users
        currentDB.collection("users").find({"mail":mail}).toArray((err,result)=>{
            if (result.length>0){
                res.status(401).json(401)
            }else{
                currentDB.collection("users").insertOne({CIN:CIN,FirstName:FirstName,LastName:LastName,Mail:mail,Pass:pass},(err,result)=>{
                    if (err) throw err
                    res.status(200).json(200)
                }
                )
            }
        }
        )
    }
    )
    }
}