import 'react-circular-progressbar/dist/styles.css'
import Home from './screens/Home'
import { useState } from 'react'

function App() {
  const [showTimerScreen, setShowTimerScreen] = useState(true)
  return <>{showTimerScreen && <Home />}</>
}

export default App
