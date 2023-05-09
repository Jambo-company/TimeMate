import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ToogleSwitch from '../ToogleSwitch'

const MainContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  left: 120px;
  margin-top: 10px;
  background-color: transparent;
  @media (max-width: 461px) {
    margin-left: -15px;
  }
`

const ClockContainer = styled(motion.div)`
  width: 250px;
  background-color: transparent;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-size: 2.5rem;
  padding: 12px;
  border: 2px solid grey;
  background-color: transparent;
  /* background-color: red; */
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
  border: 0.5px solid white;
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

const DisplayTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  width: 100%;
`

const ToggleDigitalTime = styled.span`
  color: white;
  font-size: 20px;
`

const Clock = () => {
  let time = new Date().toLocaleString([], {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  })
  const [timer, setTimer] = useState(time)
  const [showClock, setShowClock] = useState(false)
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString([], {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    })
    setTimer(time)
  }
  setInterval(UpdateTime)

  const ToggleShowing = () => {
    setShowClock((open) => !open)
  }
  return (
    <>
      <MainContainer>
        <DisplayTime>
          <ToggleDigitalTime>
            {showClock ? 'Hide Time' : 'Show Time'}
          </ToggleDigitalTime>

          <ToogleSwitch
            switchState={showClock}
            toogleFunction={ToggleShowing}
          />
        </DisplayTime>

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

