import styled from 'styled-components'
import { AnimatePresence, color, motion, useAnimation } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faList,
  faBookBookmark,
  faGrin,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'firebase/auth'
import { dbService } from '../firebase'

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
  width: 100px;
  height: 50vh;
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

const DashboardDetails = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50vh;
`
const DashboardDetailsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* background-color: #012d1c; */
  width: 56%;
`

const DashboardDetailsHeader = styled(motion.div)`
  margin-top: 100px;
  height: 100px;
`

const DashboardDetailsTitle = styled(motion.h1)`
  font-size: 40px;
`
const DashboardDetailsSubTitle = styled(motion.h1)`
  font-size: 25px;
  font-weight: 100;
  margin-top: 20px;
`

const DayTracker = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 100px;
`
const DayTrackerTime = styled(motion.span)`
  color: rgba(241, 196, 15, 0.8);
  font-size: 95px;
`
const DayTrackerInfo = styled(motion.span)`
  margin-top: 25px;
  font-size: 33px;
  font-weight: 100;
`
const DailyTracker = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 135px;
  margin-top: 60px;
`
const DailyTrackerObj = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 100px;
`
const DailyTrackerObjTime = styled(motion.span)`
  color: rgba(241, 196, 15, 0.8);
  font-size: 55px;
`
const DailyTrackerObjInfo = styled(motion.span)`
  margin-top: 25px;
  font-size: 33px;
  font-weight: 100;
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

  // async function getDashboardData() {
  //   await dbService.collection('timer').onSnapshot((snapshots) => {
  //     const dashboard = snapshots.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }))
  //     setDashboardRecords(dashboard)
  //     console.log(dashboard, "my dashboards");

  //   })
  // }

  const getDashboardData = async () => {
    if (user) {
      console.log('ngvjgvhgmvmfjtyghv')
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
              layout
              layoutId="name">
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
              <DayTrackerTime>0.0 H</DayTrackerTime>
              <DayTrackerInfo>For today</DayTrackerInfo>
            </DayTracker>
            <DailyTracker
              variants={scrollVariants}
              initial="inactive"
              whileInView="active"
              viewport={{ once: true }}
              exit="leaving">
              <DailyTrackerObj>
                <DailyTrackerObjTime>0.0 H</DailyTrackerObjTime>
                <DailyTrackerObjInfo>For a week</DailyTrackerObjInfo>
              </DailyTrackerObj>
              <DailyTrackerObj>
                <DailyTrackerObjTime>0.0 H</DailyTrackerObjTime>
                <DailyTrackerObjInfo>For a Month</DailyTrackerObjInfo>
              </DailyTrackerObj>
              <DailyTrackerObj>
                <DailyTrackerObjTime>0.0 H</DailyTrackerObjTime>
                <DailyTrackerObjInfo>For whole days</DailyTrackerObjInfo>
              </DailyTrackerObj>
            </DailyTracker>
          </DashboardDetailsWrapper>
        </DashboardDetails>
      </DashBoardContainer>
    </AnimatePresence>
  )
}
export default Logers

//                                                      i left te spark
