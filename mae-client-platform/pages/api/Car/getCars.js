import { MongoClient } from "mongodb";
import { resolve } from "styled-jsx/css";

const uri = "mongodb://localhost:27017/MAE";

export default async (req, res) => {
    if (req.method=="GET"){
        res.status(405).json("it looks like you're using "+req.method+" to fetch from this API which is an invalid request method!")
        return;
    }
    else{
        return new Promise(resolve => {
        const info=JSON.parse(req.body)
        const cin=info.cin

        MongoClient.connect(uri,(err,db)=>{

            if (err) throw err
            let currentDB = db.db("MAE")

            currentDB.collection("cars").find({"CIN":cin}).toArray((err,result)=>{
                if (err) throw err
                res.status(200).json(result)
                return resolve(result)
            }
            )
        })
    })
    }
}