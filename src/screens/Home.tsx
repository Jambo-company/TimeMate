import { useState } from 'react'
import { User } from 'firebase/auth'
import styled from 'styled-components'
import { useTimer } from 'react-timer-hook'
import 'react-circular-progressbar/dist/styles.css'
import Navigation from '../components/Navigation'
import BottomRightOptions from '../components/BottomRightOptions'
import AnalogueTimer from '../components/ClockTimer/AnalogueTimer'
import Clock from '../components/DigitalClock'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  overflow-x: hidden;
  padding-right: 10px;

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
  justify-content: space-between;
  flex-direction: column;
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

  const expiryTimestamp = new Date()
  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire: () => {
        console.warn('onExpire called')
      },
    })

  return (
    <Wrapper>
      <Navigation
        showing={showingNavigation}
        setShowing={setShowingNavigation}
      />
      {!isRunning && <Clock />}
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
