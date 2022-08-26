import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Input } from '@chakra-ui/react'
import ImageUploader from '../components/ImageUploader/ImageUploader';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

  
export default function Cars() {
    const [CIN, setCIN] = useState("")
    const [userFName, setuserFName] = useState("")
    const [userLName, setuserLName] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")

    const GetCurrentUser = async () => {
        const res = await fetch(`http://localhost:3000/api/authed`)
          const user = await res.json()
          return(user)
      }
      

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

   
    const [manufacturers, setManufacturers] = useState([])
    const [cars, setCars] = useState([])
    const [userCars, setuserCars] = useState([])
    const [selectedManufacturer, setSelectedManufacturer] = useState("")
    const [selectedCar, setSelectedCar] = useState("")
    const [selectedCarObject, setselectedCarObject] = useState({})
    const [Serial1, setSerial1] = useState("")
    const [Serial2, setSerial2] = useState("")
    const [BuyPrice, setBuyPrice] = useState(0)
    const [MarketPrice, setMarketPrice] = useState(0)
    const [updateCar, setupdateCar] = useState("")
    const [carToUpdate, setcarToUpdate] = useState({})
    const [carToDelete, setcarToDelete] = useState("")
    const [Registration, setRegistration] = useState([])
    

    const [emptyCIN, setemptyCIN] = useState(false)
    const [emptyManufacturer, setemptyManufacturer] = useState(false)
    const [emptyCar, setemptyCar] = useState(false)
    const [emptyName, setemptyName] = useState(false)
    const [emptySerial, setemptySerial] = useState(false)
    const [serialINV, setserialINV] = useState(false)
    const [carRegistered, setcarRegistered] = useState(false)
    const [emptyHorsepower, setemptyHorsepower] = useState(false)
    const [emptyYear, setemptyYear] = useState(false)
    const [emptyBuyPrice, setemptyBuyPrice] = useState(false)
    const [emptyMarketPrice, setemptyMarketPrice] = useState(false)
    const [emptyRegistration, setemptyRegistration] = useState(false)
    const [emptyDate, setemptyDate] = useState(false)

    
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
            
            getCars().then(Cars => {
                for (let i = 0; i < Cars.length; i++) {
                    let car =[{
                        make: Cars[i].make,
                        name: Cars[i].model,
                        horsepower: Cars[i].horsepower,
                        year: Cars[i].year,
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

            getUserCars(CIN).then(cars => {
                setuserCars(cars)
            })
        }
    }, [CIN])
    

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
        setcarRegistered(false)
        setemptyHorsepower(false)
        setemptyYear(false)
        setemptyBuyPrice(false)
        setemptyMarketPrice(false)
        setemptyRegistration(false)
        setemptyDate(false)


        const make = selectedCarObject.make
        const cin = CIN
        const Name = selectedCarObject.name
        const Serial = Serial1 + "-TUN-" + Serial2
        const horsepower = selectedCarObject.horsepower
        const year = selectedCarObject.year
        const BuyPrice = selectedCarObject.BuyPrice
        const MarketPrice = selectedCarObject.MarketPrice
        const registration = Registration[0]
        const Date = selectedCarObject.CirculationDate

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
        if (userFName == ""|| userLName == "") {
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
        if (isNaN(horsepower)) {
            setemptyHorsepower(true)
            return;
        }
        if (isNaN(year)) {
            setemptyYear(true)
            return;
        }
        if (MarketPrice == ""|| isNaN(MarketPrice)|| MarketPrice==0) {
            setemptyMarketPrice(true)
            return;
        }
        if (BuyPrice == ""|| isNaN(BuyPrice)|| BuyPrice==0) {
            setemptyBuyPrice(true)
            return;
        }
        if (Date == "") {
            setemptyDate(true)
            return;
        }
        if (Date.length!=10) {
            setemptyDate(true)
            return;
        }
        if (Registration.length==0) {
            setemptyRegistration(true)
            return;
        }


        console.log(Registration[0])
        const formData = new FormData();
        formData.append('CIN', cin)
        formData.append('make',make)
        formData.append('name',Name)
        formData.append('serial',Serial)
        formData.append('horsepower',horsepower)
        formData.append('year',year)
        formData.append('BuyPrice',BuyPrice)
        formData.append('MarketPrice',MarketPrice)
        formData.append('CirculDate',Date)
        formData.append('file', registration);
        axios.post('http://localhost:3000/api/Car/addCar', formData).then(res => {
            console.log(res)
            router.reload()
        }).catch(err => {
            if (err.response.status == 406){
                setcarRegistered(true)
            }
        });

        //const res = fetch(`http://localhost:3000/api/Car/addCar`,config)
        
    }
    const handleUpdate = (event) => {
        event.preventDefault()

        setemptyCIN(false)
        setemptySerial(false)
        setserialINV(false)
        setemptyPhone(false)
        setphoneINV(false)
        setcarRegistered(false)

        const cin = CIN
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
        console.log(phone2)
        if (phone2!="" ) {
            if (phone2.length!=8 || !isNumeric(phone2)) {
                setphoneINV(true)
                return;
            }
        }
        const config={
            method:"POST",
            body:JSON.stringify({
                id:carToUpdate._id,
                cin:cin,
                serial:Serial,
                phone:Phone
            })
        }
        const res = fetch(`http://localhost:3000/api/Car/updateCar`,config)
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
        const handleDelete = (event) => {

            const config={
                method:"POST",
                body:JSON.stringify({
                    id:carToDelete
                })
            }
            const res = fetch(`http://localhost:3000/api/Car/deleteCar`,config)
            res.then(data => {
                if (data.status == 200){
                    router.reload()
                }
            }
            ).catch(err => {console.log(err)})


        }
        useEffect(() => {
            let horsepower = 0
            let year = 0
            for (let i = 0; i < cars.length; i++) {
                if ((cars[i].name == selectedCar) && (cars[i].make == selectedManufacturer)) {
                    horsepower = cars[i].horsepower
                    year = cars[i].year
                }
            }
            setselectedCarObject({
                "make":selectedManufacturer,
                "name":selectedCar,
                "horsepower":horsepower,
                "year":year,
                "BuyPrice":0,
                "MarketPrice":0,
                "CirculationDate":""
            })
        }, [selectedCar])
        console.log(selectedCarObject)

        const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setOpen(false);
  }, [Registration])
  
  const handleClose = () => {
    setOpen(false);
    console.log(Registration)
  };


  return (
    <>
    <div class="grid md:grid-cols-2 md:gap-80">
        <div class="p-20">
      <div style={{padding:"4rem",border:"1px solid black",borderRadius:"30px",backgroundColor:"white",boxShadow:"10px 10px 30px #888888",width:"180%"}}>
        {updateCar==""?
                    <form>
                    <h1 style={{fontSize:"2.5rem",marginLeft:"1%"}}>Register a new car</h1><br/><br/>
                    <div class="flex">
                    <div class="relative z-0 mb-6 w-50 group">
                        <select value={selectedManufacturer} onChange={e =>{ setSelectedManufacturer(e.target.value)}} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                    <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userFName} disabled/>                
                    <label for="floating_FirstName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner's First Name</label>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                    <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userLName} disabled/>
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
                            <input  value={selectedCarObject.horsepower} onChange={e => { setselectedCarObject({"make":selectedCarObject.make,"name":selectedCarObject.name,"horsepower":parseInt(e.currentTarget.value),"year":selectedCarObject.year,"BuyPrice":selectedCarObject.BuyPrice,"MarketPrice":selectedCarObject.MarketPrice,"CirculationDate":selectedCarObject.CirculationDate}); }} type="tel" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Horsepower </label>
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                            <input  value={selectedCarObject.year} onChange={e => { setselectedCarObject({"make":selectedCarObject.make,"name":selectedCarObject.name,"horsepower":selectedCarObject.horsepower,"year":parseInt(e.currentTarget.value),"BuyPrice":selectedCarObject.BuyPrice,"MarketPrice":selectedCarObject.MarketPrice,"CirculationDate":selectedCarObject.CirculationDate}); }} type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Year</label>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 mb-6 w-full group">
                            <input  value={selectedCarObject.MarketPrice} onChange={e => { setselectedCarObject({"make":selectedCarObject.make,"name":selectedCarObject.name,"horsepower":selectedCarObject.horsepower,"year":selectedCarObject.year,"BuyPrice":selectedCarObject.BuyPrice,"MarketPrice":parseInt(e.currentTarget.value),"CirculationDate":selectedCarObject.CirculationDate}) }} type="number" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Market Price</label>
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                            <input  value={selectedCarObject.BuyPrice} onChange={e => { setselectedCarObject({"make":selectedCarObject.make,"name":selectedCarObject.name,"horsepower":selectedCarObject.horsepower,"year":selectedCarObject.year,"BuyPrice":parseInt(e.currentTarget.value),"MarketPrice":selectedCarObject.MarketPrice,"CirculationDate":selectedCarObject.CirculationDate}) }} type="number" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Buy Price</label>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div>
                            Circulation start Date : <br/>
                    <Input name="floating_date" id="floating_date" value={selectedCarObject.CirculationDate} onChange={e => { setselectedCarObject({"make":selectedCarObject.make,"name":selectedCarObject.name,"horsepower":selectedCarObject.horsepower,"year":selectedCarObject.year,"BuyPrice":selectedCarObject.BuyPrice,"MarketPrice":selectedCarObject.BuyPrice,"CirculationDate":e.currentTarget.value}) }} placeholder="Select Ciculation start Date" size="md" type="date" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  />                    
                    </div>
                    <div>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            {Registration.length !== 0?Registration[0].name:"Upload Registration document image"}
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                            <ImageUploader file={Registration} onFileChange={setRegistration}/>
                            </DialogContent>
                        </Dialog>
                    </div>
                    </div><br/>
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
                    {carRegistered&&
                        <div className='errorMessage'>
                            <p style={{padding:'1px',textAlign:'center'}}>this serial number is already registered!</p>
                        </div>
                    }
                    {emptyHorsepower&&
                        <div className='errorMessage'>
                            <p style={{padding:'1px',textAlign:'center'}}>Please enter the car's horsepower!</p>
                        </div>
                    }
                    {emptyYear&&
                        <div className='errorMessage'>
                            <p style={{padding:'1px',textAlign:'center'}}>Please enter the car's fabrication year!</p>
                        </div>
                    }
                    {emptyBuyPrice&&
                        <div className='errorMessage'>
                            <p style={{padding:'1px',textAlign:'center'}}>Please enter the car's buy price!</p>
                        </div>
                    }
                    {emptyMarketPrice&&
                        <div className='errorMessage'>
                            <p style={{padding:'1px',textAlign:'center'}}>Please enter the car's market price!</p>
                        </div>
                    }
                    {emptyDate&&
                        <div className='errorMessage'>
                            <p style={{padding:'1px',textAlign:'center'}}>Please enter the car's circulation date!</p>
                        </div>
                    }
                    {emptyRegistration&&
                        <div className='errorMessage'>
                            <p style={{padding:'1px',textAlign:'center'}}>Please upload the car's registration document!</p>
                        </div>
                    }

                    <button onClick={handleSubmit} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
            
            
            
            
            :


            <form>
            <div class="grid grid-cols-2 gap-4 content-end">
                <h1 style={{fontSize:"2.5rem",marginLeft:"1%"}}>Update Selected Car</h1>
                <button style={{marginLeft:"41%"}}><a onClick={()=>{setcarToUpdate({});setupdateCar("");setSerial1("");setSerial2("");setphone1("");setphone2("")}} class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-blue-700 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
                    <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-700 group-hover:h-full"></span>
                    <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <svg class="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Register a new Car</span>
                </a></button>
                <div class="relative z-0 mb-6 w-50 group">
                        <select value={selectedManufacturer} onChange={e => setSelectedManufacturer(e.target.value)} class="bg-gray-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="">{carToUpdate.car.split(" ")[0]}</option>
                        </select>
                    </div><div class="relative z-0 mb-6 w-full group">
                        <select value={selectedCar} onChange={e => setSelectedCar(e.target.value)} class="bg-gray-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="">{carToUpdate.car.split(" ")[1]}</option>
                        </select>
                    </div>
                </div>
            <div class="flex">
            <div class="relative z-0 mb-6 w-50 group">
                
            </div>
            </div>
            <div class="relative z-0 mb-6 w-full group">
            <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userFName} disabled/>                
            <label for="floating_FirstName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner's First Name</label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
            <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userLName} disabled/>
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
            <button onClick={handleUpdate} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            </form>
            }
      </div>
      </div>
      <div>
        <div class="p-20">
            <div style={{padding:"4rem",border:"1px solid black",borderRadius:"30px",backgroundColor:"white",boxShadow:"10px 10px 30px #888888",width:"100%"}}>
                {userCars.map((car,index)=>{
                    return(
                        <>
                        {car.CIN == CIN &&
                             <div key={index} style={{padding:"10px",border:"1px solid black",borderRadius:"30px",backgroundColor:"white",boxShadow:"10px 10px 30px #888888",width:"100%"}}>
                             <button onClick={()=>{handleDelete();setcarToDelete(car._id.toString())}} title='Delete Car' type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-800 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                 <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                 </svg>
                             </button>
                             <a onClick={()=>{
                                 setcarToUpdate(car);
                                 setupdateCar("true");
                                 setSerial1(car.serial.split("-TUN-")[0]);
                                 setSerial2(car.serial.split("-TUN-")[1]);
                                 setphone1(car.phone.split(" // ")[0]);
                                 if(typeof car.phone.split(" // ")[1] !== "undefined"){
                                     setphone2(car.phone.split(" // ")[1]);
                                 }else{setphone2("")}
                             }}>
                             <img src={car.logo} width="50%" style={{borderBottom:"1px solid black",marginLeft:"25%"}}/>
                             <div style={{textAlign:"center",marginTop:"3%"}}>
                                 {car.make} {car.name}<br/>
                                 model {car.year}<br/>
                                 {car.serial}
                             </div>
                             </a>
                         </div>
                        }
                    </>
                    )
                })}
            </div>
        </div>
      </div>
    </div>
  </>
  )
}
