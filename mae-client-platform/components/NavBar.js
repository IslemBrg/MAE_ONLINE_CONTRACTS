import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react'

export default function NavBar({authed}) {
  const router = useRouter()
  const handleLogout = async (event) => {
    const res = await fetch('http://localhost:3000/api/logout')
    const resp = await res.json()
    router.push('/Login')

  }
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    
    const GetCurrentUser = async () => {
        const res = await fetch(`http://localhost:3000/api/authed`)
          const user = await res.json()
          return(user)
      }
      GetCurrentUser().then(data => {
        if (data!=403 && data!=401){
            setFirstName(data[0].FirstName)
            setLastName(data[0].LastName)
        }
      })
  return (
    <div>
      {authed == "true"?
        // NavBar when logged in
        <div>
          <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />

<div class="min-h-screen flex flex-row max-w-xs ">
  <div class="flex flex-col w-60 bg-white rounded-r-3xl overflow-hidden shadow-2xl">
    <div class="flex items-center justify-center h-50 shadow-md">
      <Image src="/mae.png" class="mr-3 h-6 sm:h-9" width="200rem" height="200vh" alt="Flowbite Logo"/>
    </div>
    
    <ul class="flex flex-col py-4">
      <li>
        <Link href="/home">
        <a class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
          <span class="text-sm font-medium">Dashboard</span>
        </a></Link>
      </li>
      <li>
        <Link href="/Cars">
        <a class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-car"></i></span>
          <span class="text-sm font-medium">My Cars</span>
        </a></Link>
      </li>
      <li>
        <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-file"></i></span>
          <span class="text-sm font-medium">Contracts</span>
        </a>
      </li>
      <li>
        <Link href="/Profile">
        <a class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-user"></i></span>
          <span class="text-sm font-medium">Profile</span>
        </a></Link>
      </li>
      <li>
        <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-bell"></i></span>
          <span class="text-sm font-medium">Notifications</span>
          <span class="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">5</span>
        </a>
      </li>
      <li>
        <a onClick={handleLogout} href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-red-400">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-log-out"></i></span>
          <span class="text-sm font-medium">Logout</span>
        </a>
      </li>
    </ul>
  </div>
</div>
        </div>
      : // NavBar when not logged in
        <div>
          
<nav class="bg-white border-green-900 dark:bg-white ">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <a href="/" class="flex items-center">
            <Image src="/MAE-nav-logo-fr.png" class="mr-3 h-6 sm:h-9" width="300rem" height="60vh" alt="Flowbite Logo"/>
        </a>
        <div class="flex items-center">
        {router.pathname=='/Login'?
          <a href="/Signup" class="relative px-5 py-2 font-medium text-white group">
          <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-900 group-hover:skew-x-12"></span>
          <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-900 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
          <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-900 -rotate-12"></span>
          <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-500 -rotate-12"></span>
          <span class="relative">     Signup     </span>
          </a>
        :
          <a href="/Login" class="relative px-5 py-2 font-medium text-white group">
          <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-900 group-hover:skew-x-12"></span>
          <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-900 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
          <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-900 -rotate-12"></span>
          <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-500 -rotate-12"></span>
          <span class="relative">      Login      </span>
        </a>
        }
        <div style={{marginLeft:'3rem'}}>
        <a href="http://mae.prod-projet.com/fr" class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-green-500 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
          <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-green-500 group-hover:h-full"></span>
          <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Go to MAE's main webSite</span>
        </a>
        </div>
        </div>
    </div>
    
</nav>
<nav class="bg-gray-50 dark:bg-green-700">
    <div class="px-4 mx-auto max-w-screen-xl md:px-6">
        <div class="flex items-center" >
        {router.pathname=='/'&&
          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"  style={{marginTop:"12px"}}>
            <li class="mr-2">
                <Link href="/"><a aria-current="page" class="inline-block p-4 text-black bg-gray-100 rounded-t-lg active dark:bg-white dark:text-black">Home</a></Link>
            </li>
            <li class="mr-2">
                <Link href="/About"><a class="inline-block p-4 rounded-t-lg text-white hover:bg-gray-50 dark:hover:text-gray-800">About our company</a></Link>
            </li>
          </ul>
        }
        {router.pathname=='/About'&&
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"  style={{marginTop:"12px"}}>
            <li class="mr-2">
            <Link href="/"><a class="inline-block p-4 rounded-t-lg text-white hover:bg-gray-50 dark:hover:text-gray-800">Home</a></Link>
            </li>
            <li class="mr-2">
            <Link href="/About"><a aria-current="page" class="inline-block p-4 text-black bg-gray-100 rounded-t-lg active dark:bg-white dark:text-black">About our company</a></Link>
            </li>
          </ul>
        }
          {router.pathname=='/Login'&&
          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"  style={{marginTop:"12px"}}>
            <li class="mr-2">
            <Link href="/"><a class="inline-block p-4 rounded-t-lg text-white hover:bg-gray-50 dark:hover:text-gray-800">Home</a></Link>
            </li>
            <li class="mr-2">
            <Link href="/About"><a class="inline-block p-4 rounded-t-lg text-white hover:bg-gray-50 dark:hover:text-gray-800">About our company</a></Link>
            </li>
          </ul>
        }
        {router.pathname=='/Signup'&&
          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"  style={{marginTop:"12px"}}>
            <li class="mr-2">
            <Link href="/"><a class="inline-block p-4 rounded-t-lg text-white hover:bg-gray-50 dark:hover:text-gray-800">Home</a></Link>
            </li>
            <li class="mr-2">
            <Link href="/About"><a class="inline-block p-4 rounded-t-lg text-white hover:bg-gray-50 dark:hover:text-gray-800">About our company</a></Link>
            </li>
          </ul>
        }
        
          
    
        </div>
    </div>
</nav>

        </div>
      }
    </div>
  )
}
