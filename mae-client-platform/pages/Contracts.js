import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Contracts() {
    const GetCurrentUser = async () => {
        const res = await fetch(`http://localhost:3000/api/authed`)
          const user = await res.json()
          return(user)
      }
      const getUserCars = async (cin) => {
        const config = {
            method: 'POST',
            body:JSON.stringify({
                cin:cin
            })
        }
        console.log("cin: "+CIN)
        const res = await fetch(`http://localhost:3000/api/Car/getCars`,config)
        const cars = await res.json()
        return cars
    }
      
      const router=useRouter()

        const [CIN, setCIN] = useState("")
        const [userFName, setuserFName] = useState("")
        const [userLName, setuserLName] = useState("")
        const [FirstName, setFirstName] = useState("")
        const [LastName, setLastName] = useState("")
        const [userCars, setuserCars] = useState([])
        const [selectedCar, setSelectedCar] = useState([])

      useEffect(() => {
        GetCurrentUser().then(data => {
            if (data!=403 && data!=401){
                setCIN(data.CIN)
                setuserFName(data.FirstName)
                setuserLName(data.LastName)
                setFirstName(userFName)
                setLastName(userLName)
            }else{
                router.push('/Login')
            }
          })
        
    }, [])
    
    useEffect(() => {
      if(CIN!=""){
        getUserCars(CIN).then(data => {
            setuserCars(data)
        }).catch(err => {
            console.log(err)
        }
        )
      }
    }, [CIN])
    

    
  return (
    <div class="grid md:grid-cols-2 md:gap-80">
        <div class="p-20">
      <div style={{padding:"4rem",border:"1px solid black",borderRadius:"30px",backgroundColor:"white",boxShadow:"10px 10px 30px #888888",width:"180%"}}>
        <h1>Register a Contract</h1><br/><br/>
        <div class="relative z-0 mb-6 w-50 group">
                        <select value={selectedCar} onChange={e => setSelectedCar(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="">Select a Car</option>
                            {userCars.map((userCar, index) => (
                                <option key={index} value={userCar.car}>{userCar.car} // {userCar.serial}</option>
                            ))}
                        </select>
                    </div><br/>
            <div class="relative z-0 mb-6 w-full group">
                <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={CIN} disabled/>                
                <label for="floating_FirstName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner's CIN</label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
                <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userFName} disabled/>                
                <label for="floating_FirstName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner's First Name</label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
                <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userLName} disabled/>                    <label for="floating_LastName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner's Last Name</label>
            </div>
      </div>
      </div>
      <div>
        <div class="p-20">
            <div style={{padding:"4rem",border:"1px solid black",borderRadius:"30px",backgroundColor:"white",boxShadow:"10px 10px 30px #888888",width:"100%"}}>
                <h2>your OnGoing contracts</h2>
            </div>
        </div>
      </div>
    </div>
  )
}
