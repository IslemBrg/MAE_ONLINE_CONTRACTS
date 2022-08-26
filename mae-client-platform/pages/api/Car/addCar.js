import nextConnect from 'next-connect';
import multer from 'multer';
import { MongoClient, ObjectId } from "mongodb";


const util = require('util');
const uri = "mongodb://localhost:27017/MAE";
const logos = require("../data/car_logos.json");
const fs = require("fs");




const upload = multer({
  storage: multer.diskStorage({
    destination: './Images/Registration',
    filename: (req, file, cb) => cb(null,req.body.CIN +"_"+req.body.serial+"_"+ file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
    console.log(req.file)
    console.log(req.body)
    MongoClient.connect(uri,(err,db)=>{
        let currentDB = db.db("MAE")
            currentDB.collection("users").find({"CIN":req.body.CIN}).toArray((err,result)=>{
                if(result.length==0){
                    res.status(401).json("invalid CIN !!!")
                    try {
                        fs.unlinkSync(`./Images/Registration/${req.file.filename}`)
                        //file removed
                      } catch(err) {
                        console.error(err)
                      }
                }else{
                    currentDB.collection("cars").find({"serial":req.body.serial,"CIN":req.body.CIN}).toArray((err,result)=>{
                        if(result.length>0){
                            res.status(406).json(406)
                            try {
                                fs.unlinkSync(`./Images/Registration/${req.file.filename}`)
                                //file removed
                              } catch(err) {
                                console.error(err)
                              }
                        }else{
                            const logo = logos.filter(logo => logo.slug == req.body.make)[0].image.source
                            currentDB.collection("cars").insertOne({
                                "CIN":req.body.CIN,
                                "make":req.body.make,
                                "name":req.body.name,
                                "serial":req.body.serial,
                                "horsepower":req.body.horsepower,
                                "year":req.body.year,
                                "BuyPrice":req.body.BuyPrice,
                                "MarketPrice":req.body.MarketPrice,
                                "CirculDate":req.body.CirculDate,
                                "registration":req.file.filename,
                                "logo":logo
                            },(err,result)=>{

                                if (err) throw err
                                console.log(result)
                                res.status(200).json(200)
                            })
                        }
                    })
                }
        })
    })
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};