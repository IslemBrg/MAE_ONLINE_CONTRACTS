const users = require("./data/users.json")
const fs = require("fs")

export default async (req, res) =>{
    if (req.method=="GET"){res.status(405).json('invalid request method!')}
    else{
    const login=JSON.parse(req.body)
    const FirstName=login.FirstName
    const LastName=login.LastName
    const mail=login.mail
    const pass=login.pass

    const userSearch=users.filter((item)=>(item.mail==mail))
    if (userSearch.length > 0) {res.status(406).json(406)}
    else{
        const newUser = {
            "FirstName":FirstName,
            "LastName":LastName,
            "mail": mail,
            "pass": pass
        }
        fs.readFile("pages/api/data/users.json", function (err, data) {
            var json = JSON.parse(data)
            json.push(newUser)
            console.log(json)
        
            fs.writeFile("pages/api/data/users.json", JSON.stringify(json,null,4),(err)=>{
                if (err) throw err;
                console.log("saved.")
            })
        })
        res.status(200).json(200)
    }
    }
    }