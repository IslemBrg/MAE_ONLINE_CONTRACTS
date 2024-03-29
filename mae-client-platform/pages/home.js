import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

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
            setFirstName(data.FirstName)
            setLastName(data.LastName)
        }
      })

    
    

  return (
    <div>
        <h1>bienvenu</h1><br/>
        <h2>M./Mme   {FirstName} {LastName}</h2>
    </div>
  )
}
