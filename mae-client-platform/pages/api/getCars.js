import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/MAE";

export default async (req, res) => {
    if (req.method=="POST"){
        res.status(405).json('invalid request method!')
    }
    else{
        let resp = {}
        MongoClient.connect(uri,(err,db)=>{
            let currentDB = db.db("MAE")
            currentDB.collection("cars").find({}).toArray((err,result)=>{
                if (err) throw err
                res.status(200).json(result)
            }
            )
        })
    }
}