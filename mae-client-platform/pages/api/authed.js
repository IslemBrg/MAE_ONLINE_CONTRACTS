require("dotenv").config();

const users = require("./data/users.json")
const jwt = require('jsonwebtoken')

export default async (req, res) =>{
    if (req.method=="POST"){res.status(405).json('invalid request method!')}
    else{
    const token = req.cookies.session_id

    if (token == null) {res.status(401).json(401)}

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {res.status(403).json(403)}
        const result=users.filter((item)=>item.mail==user.mail)
        res.status(200).json(result)
    })
    }
}