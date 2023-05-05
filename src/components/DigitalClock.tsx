import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { faL } from '@fortawesome/free-solid-svg-icons'

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  left: 90px;
  margin-top: 10px;
`
const ClockContainer = styled.div`
  width: 200px;
  background-color: transparent;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-size: 50px;
  padding: 20px;
`
const ToggleClock = styled.button`
  width: 100px;
  height: 42px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  border: 0.5px solid white;
`
const Clock = () => {
  let time = new Date().toLocaleTimeString()
  const [timer, setTimer] = useState(time)
  const [showClock, setShowClock] = useState(false)

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString()
    setTimer(time)
  }
  setInterval(UpdateTime)

  const ToggleShowing = () => {
    setShowClock((open) => !open)
  }
  return (
    <>
      <MainContainer>
        <ToggleClock onClick={ToggleShowing}>
          {showClock ? 'hide time' : 'show time'}
        </ToggleClock>
        <ClockContainer>{showClock ? timer : null}</ClockContainer>
      </MainContainer>
    </>
  )
}
export default Clock
