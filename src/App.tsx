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

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Auth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
