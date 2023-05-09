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
  font-size: 3.74rem;
  padding: 20px;
  border: 2px solid grey;
  background-color: transparent;
`

const Clock = () => {
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
        <ClockContainer>{timer}</ClockContainer>
      </MainContainer>
    </>
  )
}
export default Clock
