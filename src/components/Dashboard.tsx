import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faBars, faAtom } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ClockUnits from './ClockTimer/ClockUnits'
import DigitalClock from './DigitalClock'
import Clock from './DigitalClock'

const DashBoardContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50vh;
  /* background-color: blue; */
  padding: 30px;
  overflow-x: hidden;
`
const LogsContainer = styled(motion.div)`
  background-color: cadetblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50vh;
  width: 100%;
`

const OverviewContainer = styled(motion.div)`
  background-color: chocolate;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50vh;
  width: 100%;
`

const LogsIcon = styled(motion.div)`
  color: white;
  width: 100px;
  height: 50vh;
  background-color: black;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
  span {
    font-size: 20px;
    display: none;
  }
  :hover {
    span {
      display: block;
    }
  }
`
const LogsRight = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 88%;
  height: 49vh;
  border-radius: 20px;
  background-color: rgba(241, 196, 15, 0.8);
  padding: 0px 50px;
`

const OverviewLeft = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 88%;
  height: 49vh;
  border-radius: 20px;
  background-color: rgba(241, 196, 15, 0.8);
  padding: 0px 50px;
`
const OverviewData = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100px;
`
const OverviewDataTitle = styled(motion.div)`
  font-size: 70px;
  font-weight: 600;
`

const OverviewDataSubtitle = styled(motion.div)`
  font-size: 20px;
  font-weight: 500;
`

const HomeAnchor = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(241, 196, 15, 0.8);
  height: 100px;
  width: 100px;
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  /* left: 10px; */
  right: 20px;
`

const logsVariants = {
  invisible: {},
  visible: {},
  exit: {},
}

const overviewVariants = {
  invisible: {},
  visible: {},
  exit: {},
}

const Logers = () => {
  const [overview, setOverview] = useState(false)
  const toggleStates = () => setOverview((prev) => !prev)
  return (
    <AnimatePresence>
      <DashBoardContainer>
        {!overview ? (
          <OverviewContainer
            variants={logsVariants}
            initial="invisble"
            animate="visible"
            exit="exit"
            layout>
            <OverviewLeft>
              <OverviewData>
                <OverviewDataTitle>Overview</OverviewDataTitle>
                <OverviewDataSubtitle>
                  Gather your time records at a glace
                </OverviewDataSubtitle>
              </OverviewData>
            </OverviewLeft>
            <LogsIcon onClick={toggleStates}>
              <FontAwesomeIcon icon={faBars} color="white" size="3x" />
              <span>Logs</span>
            </LogsIcon>
          </OverviewContainer>
        ) : null}

        {overview ? (
          <LogsContainer
            variants={overviewVariants}
            initial="invisble"
            animate="visible"
            exit="exit"
            layout>
            <LogsIcon onClick={toggleStates} whileHover={{scale:1.1, borderRadius:20}}>
              <FontAwesomeIcon icon={faAtom} color="white" size="3x" />
              <span>Overview</span>
            </LogsIcon>
            <LogsRight>
              <OverviewData>
                <OverviewDataTitle>Logs</OverviewDataTitle>
                <OverviewDataSubtitle>
                  Watch your records as a timeline
                </OverviewDataSubtitle>
              </OverviewData>
            </LogsRight>
          </LogsContainer>
        ) : null}

        <Link to="/">
          <HomeAnchor whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FontAwesomeIcon icon={faClock} color="white" size="3x" />
          </HomeAnchor>
        </Link>
      </DashBoardContainer>
    </AnimatePresence>
  )
}

export default Logers
