import styled from 'styled-components'
import { AnimatePresence, color, motion, useAnimation } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faList,
  faBookBookmark,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Chrono } from 'react-chrono'
import { User } from 'firebase/auth'
import { dbService } from '../firebase'

const DashBoardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 30px;
  overflow-x: hidden;
  @media (max-width: 461px) {
    padding: 20px;
  }
`
const LogsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50vh;
  width: 100%;
  @media (max-width: 461px) {
    height: 22vh;
  }
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
  @media (max-width: 461px) {
    width: 10% !important;
    height: 20vh;
    padding: 0px 3px;
    border-radius: 7px;
  }
`

const LogsIconText = styled(motion.span)`
  font-size: 20px;
  opacity: 1;
  @media (max-width: 461px) {
    font-size: 10px;
  }
`

const LogsRight = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 87.5%;
  height: 50vh;
  border-radius: 20px;
  background-color: rgba(241, 196, 15, 0.8);
  padding: 0px 50px;
  @media (max-width: 461px) {
    width: 80% !important;
    height: 20vh;
    padding: 0px 10px;
    border-radius: 15px;
  }
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
  @media (max-width: 461px) {
    font-size: 30px !important;
    font-weight: 500 !important;
  }
`

const OverviewDataSubtitle = styled(motion.div)`
  font-size: 20px;
  font-weight: 500;
  @media (max-width: 461px) {
    font-size: 15px;
    font-weight: 500;
  }
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
  @media (max-width: 461px) {
    height: 60px;
    width: 60px;
  }
`

const DashboardDetails = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50vh;
`
const DashboardDetailsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 56%;
  @media (max-width: 461px) {
    width: 100%;
    padding: 0px 20px;
    min-height: 95vh;
  }
`

const DashboardDetailsHeader = styled(motion.div)`
  margin-top: 100px;
  height: 100px;
  @media (max-width: 461px) {
    height: 70px;
  }
`

const DashboardDetailsTitle = styled(motion.h1)`
  font-size: 40px;
  @media (max-width: 461px) {
    font-size: 25px;
  }
`
const DashboardDetailsSubTitle = styled(motion.h1)`
  font-size: 25px;
  font-weight: 100;
  margin-top: 20px;
  @media (max-width: 461px) {
    font-size: 15px;
  }
`

const DayTracker = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 100px;
  @media (max-width: 461px) {
    margin-top: 20px;
    height: 90px;
  }
`
const DayTrackerTime = styled(motion.span)`
  color: rgba(241, 196, 15, 0.8);
  font-size: 95px;
  display: flex;
  h1 {
    font-size: 40px;
    margin-top: 40px;
    margin-left: 15px;
  }
  @media (max-width: 461px) {
    font-size: 50px;
    h1 {
      font-size: 20px;
      margin-top: 25px;
      margin-left: 10px;
    }
  }
`
const DayTrackerInfo = styled(motion.span)`
  margin-top: 25px;
  font-size: 33px;
  font-weight: 200;
  @media (max-width: 461px) {
    font-size: 18px;
    margin-top: 10px;
  }
`
const DailyTracker = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 135px;
  margin-top: 60px;

  @media (max-width: 461px) {
    margin-top: 20px;
    flex-direction: column;
    align-items: start;
    min-height: 50vh;
  }
`

const DailyTrackerObj = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 100px;
  h1 {
    font-size: 20px;
    margin-top: 30px;
    margin-left: 5px;
  }
  @media (max-width: 461px) {
    flex-direction: column;
    margin-top: 50px;
    height: 100px;
    width: 100%;
    h1 {
      font-size: 15px;
      margin-top: 20px;
      margin-left: 5px;
    }
  }
`
const DailyTrackerObjTime = styled(motion.span)`
  color: rgba(241, 196, 15, 0.8);
  font-size: 55px;
  display: flex;
  width: 300px;
  @media (max-width: 461px) {
    width: 100px;
    display: flex;
    font-size: 40px;
  }
`
const DailyTrackerObjInfo = styled(motion.span)`
  margin-top: 25px;
  font-size: 33px;
  font-weight: 100;
  @media (max-width: 461px) {
    font-size: 15px;
  }
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

const scrollVariants = {
  inactive: {
    opacity: 0,
  },
  active: {
    opacity: 1,
    transition: { duration: 8 },
  },
  leaving: {
    opacity: 0,
  },
}

interface DashboardProps {
  user: User | null
}

const Logers = ({ user }: DashboardProps) => {
  const [dashboardRecords, setDashboardRecords] = useState<any>([])
  const [overview, setOverview] = useState(false)
  const hoverAnimation = useAnimation()
  const toggleStates = () => setOverview((prev) => !prev)

  const getDashboardData = async () => {
    if (user) {
      const data = await dbService
        .collection('timer')
        .where('ownerId', '==', user.uid)
        .get()
      console.log(data.docs.map((doc) => doc.data()))
      data.docs.map((doc) => console.log(doc.data()))
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  const [isAnimating, setIsAnimating] = useState(false)
  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsAnimating(false)
      }, 700)
    }
  }, [isAnimating])

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
                  animate="visible"
                  layoutId="name">
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

        <DashboardDetails>
          <DashboardDetailsWrapper>
            <DashboardDetailsHeader>
              <DashboardDetailsTitle>Total Time</DashboardDetailsTitle>
              <DashboardDetailsSubTitle>
                For only over 10 minutes records
              </DashboardDetailsSubTitle>
            </DashboardDetailsHeader>
            <DayTracker
              variants={scrollVariants}
              initial="inactive"
              whileInView="active"
              viewport={{ once: true }}
              exit="leaving">
              <DayTrackerTime>
                0.0 <h1>H</h1>
              </DayTrackerTime>
              <DayTrackerInfo>For today</DayTrackerInfo>
            </DayTracker>
            <DailyTracker
              variants={scrollVariants}
              initial="inactive"
              whileInView="active"
              viewport={{ once: true }}
              exit="leaving">
              <DailyTrackerObj>
                <DailyTrackerObjTime>
                  0.0 <h1>H</h1>
                </DailyTrackerObjTime>
                <DailyTrackerObjInfo>For a week</DailyTrackerObjInfo>
              </DailyTrackerObj>
              <DailyTrackerObj>
                <DailyTrackerObjTime>
                  0.0<h1>H</h1>
                </DailyTrackerObjTime>
                <DailyTrackerObjInfo>For a month</DailyTrackerObjInfo>
              </DailyTrackerObj>
              <DailyTrackerObj>
                <DailyTrackerObjTime>
                  0.0 <h1>H</h1>
                </DailyTrackerObjTime>
                <DailyTrackerObjInfo>For whole days</DailyTrackerObjInfo>
              </DailyTrackerObj>
            </DailyTracker>
          </DashboardDetailsWrapper>
        </DashboardDetails>

        {/* <div
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
        </div> */}
      </DashBoardContainer>
    </AnimatePresence>
  )
}
export default Logers
