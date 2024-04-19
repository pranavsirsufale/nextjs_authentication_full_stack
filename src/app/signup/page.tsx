'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'


export default function SignupPage() {

  const router = useRouter()

  const [ user , setUser ] = useState({
    email : '',
    password : '',
    username : ''
  })

  const [ buttonDisabled , setButtonDisabled ] = useState(true)
  const [ loading , setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/users/signup`,{
        method:"POST",
        headers: {
          'Content-Type':'application/json'
        },
        body : JSON.stringify(user)
      })
      const josnResonse = await response.json()

      if(response.ok){
        console.log("Signup success ", josnResonse);
        toast.success("Signup Successfully")
        router.push('/login')
      }



    } catch (error:any) {
      console.log("signup failed");
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
    <h1> {loading ? "Processing" : "Signup"} </h1>


    <label htmlFor="username">Username</label>
    <input type="text"
    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
    id='username'
    name='username'
    value={user.username}
    onChange={(e)=>setUser({...user , username : e.target.value})}
    placeholder='username'
    />

    <label htmlFor="email">email</label>
    <input type="email"
    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
    id='email'
    name='email'
    value={user.email}
    onChange={(e)=>setUser({...user , email : e.target.value})}
    placeholder='email'
    />

    <label htmlFor="password">Username</label>
    <input type="password"
    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
    id='password'
    name='password'
    value={user.password}
    onChange={(e)=>setUser({...user , password : e.target.value})}
    placeholder='password'
    />


    <button onClick={onSignup} 
    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
    >
      {buttonDisabled ? 'fill the form' : " Signup "}
    </button>

    <Link href='/login'> Visit Login Page</Link>


    </div>
  )
}