import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/MAE";

export default async (req, res) => {
    if (req.method=="GET"){
        res.status(405).json('invalid request method!')
    }
    else{
        const info=JSON.parse(req.body)
        const CIN=info.cin
        const car=info.car
        const name=info.name
        const serial=info.serial
        const phone=info.phone

        MongoClient.connect(uri,(err,db)=>{
            let currentDB = db.db("MAE")
                currentDB.collection("users").find({"CIN":CIN}).toArray((err,result)=>{
                    if(result.length==0){
                        res.status(401).json(401)
                    }
            })   
            currentDB.collection("cars").find({"serial":serial}).toArray((err,result)=>{
                if(result.length>0){
                    res.status(406).json(406)
                }
            })

            currentDB.collection("cars").insertOne({CIN:CIN,car:car,name:name,serial:serial,phone:phone},(err,result)=>{
                if (err) throw err
                res.status(200).json(200)
            })
        })
    }
}