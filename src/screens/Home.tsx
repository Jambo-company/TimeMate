import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import styled from 'styled-components'
import { useTimer } from 'react-timer-hook'
import 'react-circular-progressbar/dist/styles.css'
import Navigation from '../components/Navigation'
import BottomRightOptions from '../components/BottomRightOptions'
import AnalogueTimer from '../components/clock-and-timer/AnalogueTimer'
import Clock from '../components/clock-and-timer/DigitalClock'

import useSound from 'use-sound'
//@ts-ignore
import alarm from '../sounds/alarm.mp3'
import { useRecoilValue } from 'recoil'
import { selectedTime } from '../atom'
import { motion } from 'framer-motion'
import { dbService } from '../firebase'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  overflow-x: hidden;
  padding-right: 10px;
  @media (max-width: 461px) {
    flex-direction: column;
    align-items: start;
    padding-left: 95px;
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
  @media (max-width: 461px) {
    margin-top: 30%;
  }
`
const RightContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  justify-content: space-between;
  flex-direction: column;
`
const EstimatedTimeContainer = styled.div`
  margin-right: 25px;
  margin-top: 30px;
  flex-direction: column;
  @media (max-width: 461px) {
    margin-bottom: 25px;
  }
`
const EstimatedTimeHeading = styled(motion.h2)`
  font-size: 25px;
  text-align: center;
  @media (max-width: 461px) {
    font-size: 20px;
  }
`
const EstimatedTime = styled(motion.h4)`
  margin-top: 17px;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  @media (max-width: 461px) {
    font-size: 25px;
  }
`

interface HomeProps {
  user: User | null
}
function Home({ user }: HomeProps) {
  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault()
      event.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', unloadCallback)
    return () => window.removeEventListener('beforeunload', unloadCallback)
  }, [])

  const [showingNavigation, setShowingNavigation] = useState(true)

  const [isAlarmEnabled, setIsAlarmEnabled] = useState(true)
  const toggleAlarm = () => setIsAlarmEnabled((prev) => !prev)
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true)
  const toggleNotification = () => setIsNotificationEnabled((prev) => !prev)

  const [alarmPlaying, setAlarmPlaying] = useState(false)
  const [playSound, { stop }] = useSound(alarm)
  function AlarmHandler() {
    playSound()
    setAlarmPlaying(true)
    const playAlarm = setInterval(() => {
      playSound()
      setTimeout(() => {
        stop()
        clearInterval(playAlarm)
        setAlarmPlaying(false)
      }, 3000)
    }, 2000)
  }

  const [secondsCounted, setSecondsCounted] = useState(0)
  const [latest, setLatest] = useState<{ id: string } | null>(null)
  async function updateTimerRecord() {
    await dbService
      .collection('timer')
      .orderBy('startTime', 'desc')
      .onSnapshot((snapshots) => {
        const dashboard = snapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setLatest(dashboard[0])
      })
    if (latest) {
      await dbService.doc(`timer/${latest.id}`).update({
        secondsCounted,
      })
    }
  }

  const expiryTimestamp = new Date()
  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire: async () => {
        await updateTimerRecord()
        console.warn('onExpire called')
        if (isAlarmEnabled) {
          AlarmHandler()
        }
        setSecondsCounted(0)
      },
    })

  useEffect(() => {
    if (isRunning) {
      setSecondsCounted((prev) => prev + 1)
      console.log('secondsCounted', secondsCounted)
    }
  }, [seconds, minutes])

  const totalSelectedTime = useRecoilValue(selectedTime)
  const [endTime, setEndTime] = useState<number | string>(0)
  useEffect(() => {
    const date = new Date(Date.now() + totalSelectedTime * 1000)
    const time = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    setEndTime(`${time}:${minutes}:${seconds}`)
  }, [totalSelectedTime])

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
    } else {
      setShowingNavigation(true)
    }
  }, [alarmPlaying])

  return (
    <Wrapper>
      <Navigation showing={showingNavigation} />
      {!isRunning && <Clock />}
      <CenterContainer>
        <CenterContainerClock>
          <AnalogueTimer
            secondsCounted={secondsCounted}
            setSecondsCounted={setSecondsCounted}
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
        <EstimatedTimeContainer>
          <EstimatedTimeHeading layout>
            Estimated ending time
          </EstimatedTimeHeading>
          <EstimatedTime layout>{endTime + ''}</EstimatedTime>
        </EstimatedTimeContainer>

        <BottomRightOptions
          user={user}
          secondsCounted={secondsCounted}
          updateTimerRecord={updateTimerRecord}
          isRunning={isRunning}
          alarmPlaying={alarmPlaying}
          AlarmHandler={AlarmHandler}
          alarmEnabled={isAlarmEnabled}
          toggleAlarm={toggleAlarm}
          notificationEnabled={isNotificationEnabled}
          toggleNotification={toggleNotification}
          pause={pause}
          resume={resume}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          setEndTime={setEndTime}
        />
      </RightContainer>
    </Wrapper>
  )
}
export default Home
