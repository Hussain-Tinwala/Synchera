import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

import toast, { Toaster } from "react-hot-toast"

import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import { axiosInstance } from './lib/axios'
import PageLoader from './components/PageLoader'
import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'

const App = () => {
  // const {data: authData, isLoading, error}=useQuery({
  //   // queryKey: ["todos"],
  //   queryKey: ["authUser"],
  //   queryFn: async()=>{
  //     // const res=await fetch('https://jsonplaceholder.typicode.com/todos')
  //     // const data=await res.json()
  //     // return data

  //     const res=await axiosInstance.get("/auth/me")
  //     return res.data;
  //   },
  //   retry: false,
  // })

  // // console.log(data)
  // // console.log({isLoading})
  // // console.log({error})

  // const authUser=authData?.user


  // const { data: authData, isLoading, error } = useQuery({
  //       queryKey: ["authUser"],
  //       queryFn: getAuthUser,
  //       retry: false,
  //       // The query should only run if the user is not in a state of logging out or has a potential token.
  //       // A simple way is to manage this with a state variable, but the core issue is that it runs on the initial load when there's no auth cookie.
  //       // The existing code is a common pattern, and the error is expected behavior. The error handling is what's important.
  //   });

  const { isLoading, authUser } = useAuthUser()

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isonboarded

  // ... rest of your component

  // Return a loading spinner while the auth check is in progress
  if (isLoading) {
    return <PageLoader />
  }

  return (
    <>
      <div className='h-screen' data-theme="night">
        {/* <button onClick={()=>toast.error("Hello!")}>Create Toast</button> */}

        <Routes>
          <Route path="/" element={
            isAuthenticated && isOnboarded ? (
              <HomePage />
            )
              : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />

              )
          }
          />
          <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />} />
          <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
          <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

        </Routes>

        <Toaster />
      </div>
    </>

  )
}

export default App