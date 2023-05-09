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
import { User } from 'firebase/auth'
import { dbService } from '../firebase'
import { IDashboardRecords } from '../utilities'
import Overview from '../components/dashboard/Overview'
import Logs from '../components/dashboard/Logs'

const DashBoardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 30px;
  overflow-x: hidden;
`
const LogsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 47vh;
  width: 100%;
`

const LogsIcon = styled(motion.div)`
  color: white;
  width: 6%;
  height: 45vh;
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
  height: 45vh;
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

interface DashboardProps {
  user: User | null
}

const Logers = ({ user }: DashboardProps) => {
  const [dashboardRecords, setDashboardRecords] = useState<IDashboardRecords[]>(
    []
  )
  const getDashboardData = async () => {
    if (user) {
      const dbResponse = await dbService
        .collection('timer')
        .where('ownerId', '==', user.uid)
        .get()
      const data = dbResponse.docs.map((doc) => doc.data())
      setDashboardRecords(data as any)
    }
  }
  useEffect(() => {
    getDashboardData()
  }, [user])

  const [overview, setOverview] = useState(true)
  const hoverAnimation = useAnimation()
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

  return (
    <AnimatePresence>
      <DashBoardContainer>
        {!overview ? (
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

        {overview ? (
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
          <HomeAnchor whileHover={{ scale: 1.1 }}>
            <FontAwesomeIcon icon={faClock} color="white" size="3x" />
          </HomeAnchor>
        </Link>

        {overview && <Overview dashboardRecords={dashboardRecords} />}

        {!overview && dashboardRecords.length !== 0 && (
          <Logs dashboardRecords={dashboardRecords} />
        )}
      </DashBoardContainer>
    </AnimatePresence>
  )
}
export default Logers
