import styled from 'styled-components'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faList,
  faBookBookmark,
  faGrin,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const DashBoardContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50vh;
  padding: 30px;
  overflow-x: hidden;
`
const LogsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50vh;
  width: 100%;
  /* background-color: red; */
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
`

const LogsIconText = styled(motion.span)`
  font-size: 20px;
  opacity: 1;
`

const LogsRight = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 88%;
  height: 50vh;
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
  right: 20px;
`

const logsIconVariants = {
  start: { width: 100, backgroundColor: 'black ' },
  focus: { width: 120, backgroundColor: '#00425A ' },
}

const logsVariants = {
  invisible: {
    width: '88%',
  },
  visible: {
    width: '87%',
  },
}

const dataTitleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const dataSubtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

const iconTextVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}
const Logers = () => {
  const [overview, setOverview] = useState(false)
  const toggleStates = () => setOverview((prev) => !prev)

  const hoverAnimation = useAnimation()

  return (
    <AnimatePresence>
      <DashBoardContainer>
        {overview ? (
          <LogsContainer>
            <LogsIcon
              onClick={toggleStates}
              variants={logsIconVariants}
              initial="start"
              whileHover="focus"
              onHoverStart={() => hoverAnimation.start('visible')}
              onHoverEnd={() => hoverAnimation.start('invisible')}
              layout>
              <FontAwesomeIcon icon={faBookBookmark} color="white" size="2x" />
              <LogsIconText whileHover={{ scale: 1.1, opacity: 1 }}>
                Overview
              </LogsIconText>
            </LogsIcon>

            <LogsRight variants={logsVariants} animate={hoverAnimation} layout>
              <OverviewData>
                <OverviewDataTitle
                  variants={dataTitleVariants}
                  initial="hidden"
                  animate="visible">
                  Logs
                </OverviewDataTitle>
                <OverviewDataSubtitle
                  variants={dataSubtitleVariants}
                  initial="hidden"
                  animate="visible">
                  Watch your records as a timeline
                </OverviewDataSubtitle>
              </OverviewData>
            </LogsRight>
          </LogsContainer>
        ) : null}

        {!overview ? (
          <LogsContainer>
            <LogsRight variants={logsVariants} animate={hoverAnimation} layout>
              <OverviewData>
                <OverviewDataTitle
                  variants={dataTitleVariants}
                  initial="hidden"
                  animate="visible">
                  Overview
                </OverviewDataTitle>
                <OverviewDataSubtitle
                  variants={dataSubtitleVariants}
                  initial="hidden"
                  animate="visible">
                  Gather your time records at a glace
                </OverviewDataSubtitle>
              </OverviewData>
            </LogsRight>
            <LogsIcon
              onClick={toggleStates}
              variants={logsIconVariants}
              initial="start"
              whileHover="focus"
              onHoverStart={() => hoverAnimation.start('visible')}
              onHoverEnd={() => hoverAnimation.start('invisible')}
              layout>
              <FontAwesomeIcon icon={faList} color="white" size="2x" />
              <LogsIconText
                variants={iconTextVariants}
                initial="hidden"
                animate="visible">
                Logs
              </LogsIconText>
            </LogsIcon>
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
