import { useState } from 'react'
import styled from 'styled-components'

import { motion, AnimatePresence } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faDatabase,
  faDisplay,
  faLanguage,
  faBell,
} from '@fortawesome/free-solid-svg-icons'

import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


import { useTimer } from 'react-timer-hook'
import Navigation from '../components/Navigation'
import BottomRightOptions from '../components/BottomRightOptions'
import { useRecoilValue } from 'recoil'
import { maxTime } from '../atom'
import AnalogueTimer from '../components/AnalogueTimer'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`
const LeftContainer = styled.div`
  width: 5%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CenterContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CenterContainerClock = styled.div``
const RightContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: end;
`

function Home() {
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false)
  const toggleAlarm = () => setIsAlarmEnabled((prev) => !prev)
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true)
  const toggleNotification = () => setIsNotificationEnabled((prev) => !prev)

  const [showingNavigation, setShowingNavigation] = useState(true)

  const expiryTimestamp = new Date()
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => {
        console.warn('onExpire called')
      },
    })

  const maxTimeOut = useRecoilValue(maxTime)
  console.log(maxTimeOut)

  return (
    <Wrapper>
      <Navigation
        showing={showingNavigation}
        setShowing={setShowingNavigation}
      />
      <CenterContainer>
        <CenterContainerClock>
          <AnalogueTimer
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
          />
        </CenterContainerClock>
      </CenterContainer>
      <RightContainer>
        <BottomRightOptions
          alarmEnabled={isAlarmEnabled}
          toggleAlarm={toggleAlarm}
          notificationEnabled={isNotificationEnabled}
          toggleNotification={toggleNotification}
          restart={restart}
          pause={pause}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </RightContainer>
    </Wrapper>
  )
}
export default Home


