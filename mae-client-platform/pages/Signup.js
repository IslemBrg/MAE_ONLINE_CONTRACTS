import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react'



export default function Login() {
    const router = useRouter()
    const isLoggedIn = async (event) => {      
      const res = await fetch(`http://localhost:3000/api/authed`)
      const user = await res.json()
      if ((user == 403) || (user == 401)) {}
      else {router.push('/app/home')}
    }
    useEffect(() => {
      isLoggedIn()
    }, [])
    
    const [CIN, setCIN] = useState('')
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('');
	  const [Password1, setPassword1] = useState('')
    const [Password2, setPassword2] = useState('')

    const [CININV, setCININV] = useState(false)
    const [PasswordNotMatching, setPasswordNotMatching] = useState(false)
    const [EmptyMailInput, setEmptyMailInput] = useState(false)
    const [EmptyPassInput, setEmptyPassInput] = useState(false)
    const [UserExist, setUserExist] = useState(false)
    const [NameINV, setNameINV] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPasswordNotMatching(false)
        setEmptyMailInput(false)
        setEmptyPassInput(false)
        setUserExist(false)
        setNameINV(false)
        setCININV(false)
        const cin = CIN
        const First_Name = FirstName[0].toUpperCase() + FirstName.slice(1).toLowerCase()
        const Last_Name = LastName[0].toUpperCase() + LastName.slice(1).toLowerCase()
        const mail = Email.toLowerCase()
        const pass = Password1
        const pass2 = Password2
        if ((cin.length != 8)||(cin.length == 0) || (!isNumeric(cin))){
          setCININV(true)
          return;
        }
        if(First_Name == ""){
          setNameINV(true)
          return;
        }
        if(Last_Name == ""){
          setNameINV(true)
          return;
        }
        if(mail == ""){
          setEmptyMailInput(true)
          return;
        }
        if(pass == ""){
          setEmptyPassInput(true)
          return;
        }
        if (pass != pass2){
          setPasswordNotMatching(true)
          return;
        }
        const config={
          method:"POST",
          body:JSON.stringify({
            CIN:cin,
            FirstName:First_Name,
            LastName:Last_Name,
            mail:mail,
            pass:pass
          })
        }
        const res = await fetch(`http://localhost:3000/api/signup`,config)
        const signup = await res.json()
        if (signup == 406){setUserExist(true)}
        if (signup == 200){router.push('/Login')}
      };

  return (
    <div class="min-h-screen flex justify-center items-center">
	<div class="absolute w-60 h-60 rounded-xl bg-[#86C200] -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
	</div>
	<div class="absolute w-48 h-48 rounded-xl bg-[#86C200] -bottom-6 -right-10 transform rotate-12 hidden md:block">
	</div>
	<div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
		<div>
			<h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Create your Account</h1>
			<p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create your
				account to enjoy all the online services that our company provides!</p>
		</div>
    <form>
		<div class="space-y-4">
            <input value={CIN} onChange={e => { setCIN(e.currentTarget.value); }} type="text" placeholder="Num CIN" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
            <input value={FirstName} onChange={e => { setFirstName(e.currentTarget.value); }} type="text" placeholder="First Name" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
            <input value={LastName} onChange={e => { setLastName(e.currentTarget.value); }} type="text" placeholder="Last Name" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			      <input value={Email} onChange={e => { setEmail(e.currentTarget.value); }} type="text" placeholder="Email Addres" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			      <input value={Password1} onChange={e => { setPassword1(e.currentTarget.value); }} type="password" placeholder="Password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
            <input value={Password2} onChange={e => { setPassword2(e.currentTarget.value); }} type="password" placeholder="Confirm Password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />

    </div>
			<div class="text-center mt-6">
            {CININV && 
              <div className='errorMessage'>
              <p style={{padding:'1px',textAlign:'center'}}>Invalid CIN!</p>
            </div>
            }
            {PasswordNotMatching && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>passwords do not match!</p>
              </div>
            }
            {EmptyMailInput && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>please enter your email!</p>
              </div>
            }
            {EmptyPassInput && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>please enter your password!</p>
              </div>
            }
            {NameINV &&
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>please enter your name!</p>
              </div>
            }
            {UserExist && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>this email is already registered!</p>
              </div>
            }
				<button onClick={handleSubmit} class="py-3 w-64 text-xl text-white bg-green-400 rounded-2xl">Create Account</button>
				<p class="mt-4 text-sm">Already Have An Account? <Link href='/Login'><span class="underline cursor-pointer"> Sign In</span></Link>
				</p>
			</div>
      </form>
		</div>
		<div class="w-40 h-40 absolute bg-[#00854B] rounded-full top-0 right-12 hidden md:block"></div>
		<div
			class="w-20 h-40 absolute bg-[#00854B] rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
		</div>
	</div>
  )
}
