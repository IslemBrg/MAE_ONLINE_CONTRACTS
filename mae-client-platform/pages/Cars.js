import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Cars() {
    const router = useRouter()
    const getManufacturers = async () => {
        const res = await fetch(`https://private-anon-4b46068cd1-carsapi1.apiary-mock.com//manufacturers`)
        const manufacturers = await res.json()
        return manufacturers
    }
    const getCars = async ()=> {
        const res = await fetch(`https://private-anon-4b46068cd1-carsapi1.apiary-mock.com/cars`)
        const cars = await res.json()
        return cars
    }

    const getUserCars = async () => {
        const res = await fetch(`http://localhost:3000/api/getCars`)
        const cars = await res.json()
        return cars
    }

    const [manufacturers, setManufacturers] = useState([])
    const [cars, setCars] = useState([])
    const [userCars, setuserCars] = useState([])
    const [selectedManufacturer, setSelectedManufacturer] = useState("")
    const [selectedCar, setSelectedCar] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Serial1, setSerial1] = useState("")
    const [Serial2, setSerial2] = useState("")
    const [phone1, setphone1] = useState("")
    const [phone2, setphone2] = useState("")
    const [CIN, setCIN] = useState("")

    const [emptyCIN, setemptyCIN] = useState(false)
    const [emptyManufacturer, setemptyManufacturer] = useState(false)
    const [emptyCar, setemptyCar] = useState(false)
    const [emptyName, setemptyName] = useState(false)
    const [emptySerial, setemptySerial] = useState(false)
    const [serialINV, setserialINV] = useState(false)
    const [emptyPhone, setemptyPhone] = useState(false)
    const [phoneINV, setphoneINV] = useState(false)
    const [carRegistered, setcarRegistered] = useState(false)

    const GetCurrentUser = async () => {
        const res = await fetch(`http://localhost:3000/api/authed`)
          const user = await res.json()
          return(user)
      }
    useEffect(() => {
        getCars().then(Cars => {
            for (let i = 0; i < Cars.length; i++) {
                let car =[{
                    make: Cars[i].make,
                    name: Cars[i].model,
                }]
                setCars(cars => [...cars, ...car])
            }
        }
        ).catch(err => {console.log(err)})

        getManufacturers().then(Manufacturers => {
            for (let i = 0; i < Manufacturers.length; i++) {
                setManufacturers(manufacturers => [...manufacturers, Manufacturers[i].name])
            }
        }).catch(err => {console.log(err)})

        GetCurrentUser().then(data => {
            if (data!=403 && data!=401){
                setCIN(data[0].CIN)
            }
          })

        getUserCars().then(cars => {
            setuserCars(cars)
        })
    }, [])
    console.log(userCars)

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }

    const handleSubmit = (event) => {
        event.preventDefault()

        setemptyCIN(false)
        setemptyManufacturer(false)
        setemptyCar(false)
        setemptyName(false)
        setemptySerial(false)
        setserialINV(false)
        setemptyPhone(false)
        setphoneINV(false)
        setcarRegistered(false)

        const car = selectedManufacturer + " " + selectedCar
        const cin = CIN
        const Name = FirstName + " " + LastName
        const Serial = Serial1 + "-TUN-" + Serial2
        const Phone = ""
        if (phone2 != "") {
            Phone = phone1 + " // " + phone2
        }else{
            Phone = phone1
        }

        if (cin == "") {
            setemptyCIN(true)
            return;
        }
        if (selectedManufacturer == "") {
            setemptyManufacturer(true)
            return;
        }
        if (selectedCar == "") {
            setemptyCar(true)
            return;
        }
        if (FirstName == ""|| LastName == "") {
            setemptyName(true)
            return;
        }
        if ((Serial1 == "")||(Serial2 == "")) {
            setemptySerial(true)
            return;
        }
        if (Serial1.length>3 || Serial2.length>4 || !isNumeric(Serial1) || !isNumeric(Serial2)) {
            setserialINV(true)
            return;
        }
        if (Phone == "") {
            setemptyPhone(true)
            return;
        }
        if (phone1.length!=8 || !isNumeric(phone1)) {
            setphoneINV(true)
            return;
        }
        if (phone2.length!=0 && phone2.length!=8 && !isNumeric(phone2)) {
            setphoneINV(true)
            return;
        }


        const config={
            method:"POST",
            body:JSON.stringify({
                cin:cin,
                car:car,
                name:Name,
                serial:Serial,
                phone:Phone
            })
          }
        const res = fetch(`http://localhost:3000/api/addCar`,config)
        res.then(data => {
            if (data.status == 200){
                router.reload()
            }
            else{
                if(data.status == 406){
                    setcarRegistered(true)
                }
            }
        }).catch(err => {console.log(err)})
    }
    
  return (
    <div class="grid md:grid-cols-2 md:gap-80">
        <div class="p-20">
      <div style={{padding:"4rem",border:"1px solid black",borderRadius:"30px",backgroundColor:"white",boxShadow:"10px 10px 30px #888888",width:"180%"}}>
        <form>
            <h1 style={{fontSize:"2.5rem",marginLeft:"1%"}}>Register a new car</h1><br/><br/>
            <div class="flex">
            <div class="relative z-0 mb-6 w-50 group">
                <select value={selectedManufacturer} onChange={e => setSelectedManufacturer(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="">Select a manufacturer</option>
                    {manufacturers.map((manufacturer, index) => (
                        <option key={index} value={manufacturer}>{manufacturer}</option>
                    ))}
                </select>
            </div><div class="relative z-0 mb-6 w-full group">
                <select value={selectedCar} onChange={e => setSelectedCar(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="">Select the car model</option>
                    {cars.map((car, index) => (
                        <>
                        {car.make == selectedManufacturer && (
                            <option key={index} value={car.name}>{car.name}</option>
                        )}
                        </>
                    ))}
                </select>
            </div>
            </div>
            <div class="relative z-0 mb-6 w-full group">
                <input  value={FirstName} onChange={e => { setFirstName(e.currentTarget.value); }} id="floating_FirsName" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_FirstName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner's First Name</label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
                <input  value={LastName} onChange={e => { setLastName(e.currentTarget.value); }} id="floating_LastName" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_LastName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner's Last Name</label>
            </div>
            <h1 style={{fontSize:"1.5rem",marginLeft:"40%"}}>Serial Number</h1><br/>
            <div class="grid md:grid-cols-3 md:gap-6" style={{marginLeft:"15%"}}>
                <div class="relative z-0 mb-6 w-20 group">
                    <input  value={Serial1} onChange={e => { setSerial1(e.currentTarget.value); }} style={{textAlign:"center"}} type="text" name="floating_first_num" id="floating_first_num" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                </div>
                <div class="relative z-0 mb-6 w-20 group">
                    <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value="    TUN" disabled/>
                </div>
                <div class="relative z-0 mb-6 w-20 group" >
                    <input  value={Serial2} onChange={e => { setSerial2(e.currentTarget.value); }} style={{textAlign:"center"}} type="text" name="floating_last_num" id="floating_last_num" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 mb-6 w-full group">
                    <input  value={phone1} onChange={e => { setphone1(e.currentTarget.value); }} type="tel" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number 1</label>
                </div>
                <div class="relative z-0 mb-6 w-full group">
                    <input  value={phone2} onChange={e => { setphone2(e.currentTarget.value); }} type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number 2</label>
                </div>
            </div>
            {emptyCIN&&
                <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>You are not logged in!</p>
                </div>
            }
            {emptyManufacturer&&
                <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>Please select a manufacturer!</p>
              </div>
            }
            {emptyCar&&
                <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>Please select a model!</p>
                </div>
            }
            {emptyName&&
                <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>Please enter the car owner's FULL name!</p>
                </div>
            }
            {emptySerial&&
                <div className='errorMessage'>
                    <p style={{padding:'1px',textAlign:'center'}}>Please enter the car's serial number!</p>
                </div>
            }
            {serialINV &&
                <div className='errorMessage'>
                    <p style={{padding:'1px',textAlign:'center'}}>Please enter a valid serial number!</p>
                </div>
            }
            {phoneINV &&
                <div className='errorMessage'>
                    <p style={{padding:'1px',textAlign:'center'}}>Please enter a valid phone number!</p>
                </div>
            }
            {emptyPhone&&
                <div className='errorMessage'>
                    <p style={{padding:'1px',textAlign:'center'}}>Please enter the car owner's phone number!</p>
                </div>
            }
            {carRegistered&&
                <div className='errorMessage'>
                    <p style={{padding:'1px',textAlign:'center'}}>this serial number is already registered!</p>
                </div>
            }
            <button onClick={handleSubmit} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
      </div>
      </div>
      <div>
        <div class="p-20">
            <div style={{padding:"4rem",border:"1px solid black",borderRadius:"30px",backgroundColor:"white",boxShadow:"10px 10px 30px #888888",width:"100%"}}>
                {userCars.map((car,index)=>{
                    return(
                    <div key={index}>
                        {car.car}
                    </div>
                    )
                })}
            </div>
        </div>
      </div>
    </div>
  )
}
