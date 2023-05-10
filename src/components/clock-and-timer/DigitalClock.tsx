import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'

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

interface ToggleTimeProps {
  displayClock: boolean
}

const Clock = ({ displayClock }: ToggleTimeProps) => {
  let time = new Date().toLocaleString([], {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  })
  const [timer, setTimer] = useState(time)

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString([], {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    })
    setTimer(time)
  }
  setInterval(UpdateTime)

  return (
    <>
      <MainContainer>
        {displayClock ? (
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
