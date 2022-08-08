import cookie from 'cookie'

export default async (req, res) =>{
    if (req.method=="POST"){res.status(405).json('invalid request method!')}
    else {
    const token = req.cookies.session_id
    res.setHeader('Set-Cookie', cookie.serialize('session_id','Deleted',{
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1,
        path:'/'
    }))
    res.status(200).json(200)
    }
}