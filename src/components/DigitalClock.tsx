import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { faL } from '@fortawesome/free-solid-svg-icons'

const MainContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  left: 120px;
  margin-top: 10px;
  background-color: transparent;
`
const ClockContainer = styled(motion.div)`
  width: 200px;
  background-color: transparent;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-size: 50px;
  padding: 20px;
  background-color: transparent;
`
const ClockHolder = styled(motion.div)`
  width: 200px;
  background-color: transparent;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-size: 50px;
  padding: 20px;
  background-color: transparent;
`

const ToggleClock = styled(motion.button)`
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
  border: 2px solid white;
  :hover{
    background-color: #184c78;
  }
`

const clockContainerVariants = {
  inactive: {
    opacity: 0,
    scale: 0,
  },
  active: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

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
        <ToggleClock onClick={ToggleShowing} whileHover={{scale:1.2}} >
          {showClock ? 'Hide Time' : 'Show Time'}
        </ToggleClock>

        {showClock ? (
          <ClockContainer
            variants={clockContainerVariants}
            initial="inactive"
            animate="active"
            layout>
            {timer}
          </ClockContainer>
        ) : (
          <ClockHolder />
        )}
      </MainContainer>
    </>
  )
}
export default Clock
