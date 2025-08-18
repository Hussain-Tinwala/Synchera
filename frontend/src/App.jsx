import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

import toast, {Toaster} from "react-hot-toast"

import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import { axiosInstance } from './lib/axios'

const App = () => {
  const {data, isLoading, error}=useQuery({queryKey: ["todos"],
    queryFn: async()=>{
      // const res=await fetch('https://jsonplaceholder.typicode.com/todos')
      // const data=await res.json()
      // return data

      const res=await axiosInstance.get("http://localhost:3000/api/auth")
      return res.data;
    }
  })

  console.log(data)
  console.log({isLoading})
  console.log({error})

  return (
    <>
    <div className='h-screen' data-theme="night">
      {/* <button onClick={()=>toast.error("Hello!")}>Create Toast</button> */}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

      </Routes>

      <Toaster />
    </div>
    </>

  )
}

export default App