import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from 'react-router-dom'

import React, { useEffect, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'

import Auth from './screens/Auth'
import { auth } from './firebase'

import 'react-circular-progressbar/dist/styles.css'
import Home from './screens/Home'
import Dashboard from './screens/Dashboard'
import { User } from 'firebase/auth'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const userData = () => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     console.log(authUser, 'this is the user')
  //     if (authUser) {
  //       setUser(authUser)
  //       setIsLoggedIn(true)
  //     } else {
  //       setIsLoggedIn(false)
  //     }
  //     setInit(true)
  //   })
  // }, [])

  useQuery('userDetails', userData)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home user={user} />
            ) : (
              <Auth
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

