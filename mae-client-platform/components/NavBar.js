import React from 'react'
import Link from 'next/link'

export default function NavBar() {
  return (
    <div className='login'>
        <div  style={{borderBottom:"1px solid green",borderRadius:"12px",width:"8.3vh"}}>
            <Link href="/Login"><button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                <b>Login</b>
            </button></Link>
        </div>
    </div>
  )
}
