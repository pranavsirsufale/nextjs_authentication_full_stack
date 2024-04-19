'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


function page() {

  const router = useRouter()
  const [ user , setUser] = useState(
    {
      email : "",
      password : ''
    }
  )

  const [ loading , setLoading ] = useState(false)
  const [ buttonDisabled , setButtonDisabled ] = useState(true)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`/api/users/login`,user)
      console.log(response);


      console.log("Login success ", response);
        toast.success("Login Successfully")
        router.push('/profile')
      if (response) {
        setLoading(false)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  },[user])



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
    <h1> {loading ? "Processing" : "Login"} </h1>


    

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


    <button onClick={onLogin} 
    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
    >
      { buttonDisabled ? 'fill the form' : " Login "}
    </button>

    <Link href='/signup'> Visit Signup Page</Link>


    </div>
  )
}

export default page