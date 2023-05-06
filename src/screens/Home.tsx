import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import styled from 'styled-components'
import { useTimer } from 'react-timer-hook'
import 'react-circular-progressbar/dist/styles.css'
import Navigation from '../components/Navigation'
import BottomRightOptions from '../components/BottomRightOptions'
import AnalogueTimer from '../components/ClockTimer/AnalogueTimer'

import useSound from 'use-sound'
//@ts-ignore
import alarm from '../sounds/alarm.mp3'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  @media (max-width: 461px) {
    flex-direction: column;
    align-items: start;
    padding-left: 110px;
  }
`

const CenterContainer = styled.div`
  width: 88%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CenterContainerClock = styled.div`
  margin-left: 15%;
`
const RightContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: end;
`

interface HomeProps {
  user: User | null
}
function Home({ user }: HomeProps) {
  const [showingNavigation, setShowingNavigation] = useState(true)

  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false)
  const toggleAlarm = () => setIsAlarmEnabled((prev) => !prev)
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true)
  const toggleNotification = () => setIsNotificationEnabled((prev) => !prev)

  const [alarmPlaying, setAlarmPlaying] = useState(false)
  console.log(alarmPlaying)
  const [playSound, { stop }] = useSound(alarm, { interrupt: true })
  function AlarmHandler(action: 'Play' | 'Stop') {
    if (action === 'Play') {
      console.log('Action:', action)
      playSound()
      const playAlarm = setInterval(() => {
        playSound()
      }, 2000)
      setAlarmPlaying(true)
      setTimeout(() => {
        clearInterval(playAlarm)
        setAlarmPlaying(false)
      }, 60000)
    }
    if (action === 'Stop') {
      console.log('Action:', action)
      stop()
      setAlarmPlaying(false)
      const stopAlarm = setInterval(() => {
        stop()
      }, 10)
      setTimeout(() => {
        clearInterval(stopAlarm)
      }, 60000)
    }
  }

  const expiryTimestamp = new Date()
  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire: () => {
        console.warn('onExpire called')
        AlarmHandler('Play')
      },
    })

  useEffect(() => {
    if (isRunning) {
      setShowingNavigation(false)
    } else {
      setShowingNavigation(true)
    }
  }, [isRunning])

  useEffect(() => {
    if (alarmPlaying) {
      setShowingNavigation(false)
    } else{
      setShowingNavigation(true)
    }
  }, [alarmPlaying])

  return (
    <Wrapper>
      <Navigation showing={showingNavigation} />
      <CenterContainer>
        <CenterContainerClock>
          <AnalogueTimer
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
            restart={restart}
            pause={pause}
          />
        </CenterContainerClock>
      </CenterContainer>
      <RightContainer>
        <BottomRightOptions
          user={user}
          isRunning={isRunning}
          alarmPlaying={alarmPlaying}
          AlarmHandler={AlarmHandler}
          setShowingNavigation={setShowingNavigation}
          alarmEnabled={isAlarmEnabled}
          toggleAlarm={toggleAlarm}
          notificationEnabled={isNotificationEnabled}
          toggleNotification={toggleNotification}
          restart={restart}
          pause={pause}
          resume={resume}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </RightContainer>
    </Wrapper>
  )
}
export default Home
