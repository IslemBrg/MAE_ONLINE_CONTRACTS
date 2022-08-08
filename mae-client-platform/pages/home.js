import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router';

export default function home() {
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")

    const router = useRouter()
    const isLoggedIn = async () => {
		const res = await fetch(`http://localhost:3000/api/authed`)
		  const user = await res.json()
		  if ((user == 403) || (user == 401)) {router.push('/Login')}
	  }
    useEffect(() => {
        isLoggedIn()
    } , [])
    const GetCurrentUser = async () => {
        const res = await fetch(`http://localhost:3000/api/authed`)
          const user = await res.json()
          return(user)
      }
      GetCurrentUser().then(data => {
        if (data!=403 && data!=401){
            console.log(data)
            setFirstName(data[0].FirstName)
            setLastName(data[0].LastName)
        }
      })

    const handleLogout = async (event) => {
        const res = await fetch('http://localhost:3000/api/logout')
        const resp = await res.json()
        router.push('/Login')
    }
    
    

  return (
    <div>
      <button color='success' onClick={handleLogout} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
            <b style={{fontSize: "1.7vh"}}>   Logout</b>
        </button>
        <h1>bienvenu</h1><br/>
        <h2>M./Mme   {FirstName} {LastName}</h2>
    </div>
  )
}
