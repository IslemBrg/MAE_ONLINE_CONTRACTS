import React from 'react'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router';



export default function Login() {
	const [EmptyCINInput, setEmptyCINInput] = useState(false)
  	const [EmptyPassInput, setEmptyPassInput] = useState(false)
  	const [InvalidCredentials, setInvalidCredentials] = useState(false)

	const [CIN, setCIN] = useState('');
	const [Password, setPassword] = useState('')
	
    const router = useRouter()

	const isLoggedIn = async () => {
		const res = await fetch(`http://localhost:3000/api/authed`)
		  const user = await res.json()
		  if ((user == 403) || (user == 401)) {}
		  else{router.push('/home')}
	  }
	useEffect(() => {
	  isLoggedIn()

	}, [])
	
	function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		const cin = CIN
		const pass = Password
		setEmptyCINInput(false)
		setEmptyPassInput(false)
		setInvalidCredentials(false)
		if((cin.length == 0)||(cin.length != 8) || (!isNumeric(cin))){
		  setEmptyCINInput(true)
		  return;
		}
		if(pass == ""){
		  setEmptyPassInput(true)
		  return;
		}
		const config={
		  method:"POST",
		  body:JSON.stringify({
			CIN:cin,
			pass:pass
		  })
		}
		const res = await fetch(`http://localhost:3000/api/auth`,config)
		const login = await res.json()
		if (login==200){
		  console.log('Valid credentials!')
		  router.push('/home')
		}
		if (login==401){
		  console.log(setInvalidCredentials(true))
		}
	  };
  return (
    <div class="min-h-screen flex justify-center items-center">
	<div class="absolute w-60 h-60 rounded-xl bg-[#86C200] -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
	</div>
	<div class="absolute w-48 h-48 rounded-xl bg-[#86C200] -bottom-6 -right-10 transform rotate-12 hidden md:block">
	</div>
	<div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
		<div>
			<h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Login to your Account</h1>
			<p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">login to your
				account to enjoy all the online services that our company provides!</p>
		</div>
		<form>
		<div class="space-y-4">
			<input value={CIN} onChange={e => { setCIN(e.currentTarget.value); }} id='CIN' type="text" placeholder="num CIN" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			<input value={Password} onChange={e => { setPassword(e.currentTarget.value); }} id='pass' type="password" placeholder="Password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
    </div>
			<div class="text-center mt-6">
			{EmptyCINInput && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>Please enter a valid CIN!</p>
              </div>
            }
            {EmptyPassInput && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>Please enter a password!</p>
              </div>
            }
            {InvalidCredentials && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>Incorrect CIN or password!</p>
              </div>
            }
				<button onClick={handleSubmit} class="py-3 w-64 text-xl text-white bg-green-400 rounded-2xl">Login Account</button>
				<p class="mt-4 text-sm">Don't Have An Account? <Link href='/Signup'><span class="underline cursor-pointer"> Sign Up</span></Link>
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
