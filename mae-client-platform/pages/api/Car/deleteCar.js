import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017/MAE";
const fs = require("fs");

export default async (req, res) => {
    if (req.method=="GET"){
        res.status(405).json('invalid request method!')
    }else{
        const info=JSON.parse(req.body)
        const id=info.id
        console.log(id)
        MongoClient.connect(uri,(err,db)=>{
            let currentDB = db.db("MAE")
            currentDB.collection("cars").find({"_id":ObjectId(id)}).toArray((err,result)=>{
                if(result.length==0){
                    res.status(401).json(401)
                }else{
                    currentDB.collection("cars").deleteOne({"_id":ObjectId(id)},(err,result2)=>{
                        if (err) throw err
                        res.status(200).json(200)
                        try {
                            fs.unlinkSync(`./Images/Registration/${result[0].registration}`)
                            //file removed
                          } catch(err) {
                            console.error(err)
                          }
                    })
                }
            })           
        })
    }
}