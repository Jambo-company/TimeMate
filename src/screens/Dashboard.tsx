import styled from 'styled-components'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faList,
  faBookBookmark,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Chrono } from 'react-chrono'

const DashBoardContainer = styled(motion.div)`
  display: flex;
  /* align-items: center; */
  /* justify-content: space-between; */
  flex-direction: column;
  min-height: 100vh;
  padding: 30px;
  overflow-x: hidden;
  /* background-color: white; */
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
  width: 6%;
  height: 50vh;
  background-color: rgba(0, 0, 0, 1);
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
  width: 87.5%;
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

const DashboardData = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: #011d36;
  height: 50vh;
  margin-top: 50px;
`

const DashboardDataHeader = styled(motion.div)`
  height: 100px;
  background-color: red;
`

const DashboardDataTitle = styled(motion.h1)`
  font-size: 10px;
`

const logsIconVariants = {
  start: { width: '6%' },
  focus: { width: '7%', backgroundColor: '#00425A' },
}

const logsVariants = {
  invisible: {
    width: '87.5%',
  },
  visible: {
    width: '86.5%',
  },
}

const dataTitleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const dataSubtitleVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

const iconTextVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}
const Logers = () => {
  const [overview, setOverview] = useState(false)
  const toggleStates = () => {
    setIsAnimating(true)
    setOverview((prev) => !prev)
  }

  const [isAnimating, setIsAnimating] = useState(false)
  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsAnimating(false)
      }, 700)
    }
  }, [isAnimating])
  const hoverAnimation = useAnimation()

  const items = {
    cardTitle: 'Timemate',
    cardSubtitle: `Total timer set for ${new Date(
      Date.now()
    ).toLocaleDateString()}: 4hours`,
    date: Date.now(),
  }

  return (
    <AnimatePresence>
      <DashBoardContainer>
        {overview ? (
          <LogsContainer>
            <LogsIcon
              onClick={toggleStates}
              variants={logsIconVariants}
              initial="start"
              whileHover={!isAnimating ? 'focus' : ''}
              onHoverStart={() =>
                !isAnimating && hoverAnimation.start('visible')
              }
              onHoverEnd={() =>
                !isAnimating && hoverAnimation.start('invisible')
              }
              layoutId="overview-id"
              transition={{ duration: 0.45 }}>
              {!isAnimating && (
                <>
                  <FontAwesomeIcon
                    icon={faBookBookmark}
                    color="white"
                    size="2x"
                  />
                  <LogsIconText
                    variants={iconTextVariants}
                    initial="hidden"
                    animate="visible">
                    Overview
                  </LogsIconText>
                </>
              )}
            </LogsIcon>

            <LogsRight
              layoutId="logs-id"
              transition={{ duration: 0.45 }}
              variants={logsVariants}
              animate={hoverAnimation}>
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
            <LogsRight
              layoutId="overview-id"
              transition={{ duration: 0.45 }}
              variants={logsVariants}
              animate={hoverAnimation}>
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
              whileHover={!isAnimating ? 'focus' : ''}
              onHoverStart={() =>
                !isAnimating && hoverAnimation.start('visible')
              }
              onHoverEnd={() =>
                !isAnimating && hoverAnimation.start('invisible')
              }
              layoutId="logs-id"
              transition={{ duration: 0.45 }}>
              {!isAnimating && (
                <>
                  <FontAwesomeIcon icon={faList} color="white" size="2x" />
                  <LogsIconText
                    variants={iconTextVariants}
                    initial="hidden"
                    animate="visible">
                    Logs
                  </LogsIconText>
                </>
              )}
            </LogsIcon>
          </LogsContainer>
        ) : null}

        <Link to="/">
          <HomeAnchor whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FontAwesomeIcon icon={faClock} color="white" size="3x" />
          </HomeAnchor>
        </Link>
        <DashboardData>
          <DashboardDataHeader></DashboardDataHeader>
        </DashboardData>
        <div
          style={{
            width: '700px',
            height: '500px',
            padding: 100,
            overflow: 'scroll',
          }}>
          <Chrono
            items={[1, 2, 3, 4, 5].map(() => items)}
            mode="VERTICAL"
            darkMode={true}
            cardHeight={100}
            cardWidth={500}
            hideControls={true}
            theme={{
              cardTitleColor: 'yellow',
              secondary: 'yellow',
            }}
            onItemSelected={(data) => console.log(data)}
            contentDetailsHeight={70}
            timelinePointShape="diamond"
          />
        </div>
      </DashBoardContainer>
    </AnimatePresence>
  )
}

export default Logers
