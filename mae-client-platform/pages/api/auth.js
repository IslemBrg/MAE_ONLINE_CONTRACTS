import cookie from 'cookie'

require("dotenv").config();

const users = require("./data/users.json")
const jwt = require('jsonwebtoken')


export default async (req, res) =>{
    if (req.method=="GET"){
        res.status(405).json('invalid request method!')
    }
    else {
    const login=JSON.parse(req.body)
    const mail=login.login
    const pass=login.pass
    const result=users.filter((item)=>(item.mail==mail) && (item.pass==pass))
    console.log(result)
    if (result.length >0) {
        const userToken = jwt.sign({mail}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'})
        res.setHeader('Set-Cookie', cookie.serialize('session_id',userToken,{
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600,
            path:'/'
        }))
        res.status(200).json(200)
    }else{
        res.status(401).json(401)
    }
    }
}