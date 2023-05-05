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
import Dashboard from './components/Dashboard'
import { User } from 'firebase/auth'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [user, setUser] = useState<User | null>(null)
  console.log('User', user)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
