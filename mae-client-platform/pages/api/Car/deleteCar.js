import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017/MAE";

export default async (req, res) => {
    if (req.method=="GET"){
        res.status(405).json('invalid request method!')
    }else{
        const info=JSON.parse(req.body)
        const id=info.id
        console.log(id)
        MongoClient.connect(uri,(err,db)=>{
            let currentDB = db.db("MAE")
                currentDB.collection("cars").deleteOne({"_id":ObjectId(id)},(err,result)=>{
                    if (err) throw err
                    console.log(result)
                    res.status(200).json(200)
                }
                )
            
            
        })
    }
}