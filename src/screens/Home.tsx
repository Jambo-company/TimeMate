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
import { useQuery } from 'react-query'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
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
  @media (max-width: 461px) {
    margin-top: 150px;
    margin-bottom: 50px;
  }
  @media (min-width: 461px) and (max-width: 1024px) {
    margin-left: 20%;
    margin-top: 10%;
  }
`
const CenterContainerClock = styled.div`
  margin-left: 15%;
  margin-top: 12%;
`
const RightContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  width: 20%;
  background-color: #496c38;
`
const EstimatedTimeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
  padding: 20px;
  justify-content: space-evenly;
  position: absolute;
  bottom: 10px;
  left: 33%;

  @media (max-width: 461px) {
    display: flex;
    flex-direction: column;
    height: 60px;
    width: 65%;
    padding: 0px;
    position: absolute;
    top: 55%;
    left: 28%;
  }

  @media (min-width: 461px) and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    left: 10%;
    width: 40%;
    height: 100px;
    display: flex;
    justify-content: space-between;
  }
`
const EstimatedTimeHeading = styled(motion.h2)`
  font-size: 30px;
  font-weight: 500;
  @media (max-width: 461px) {
    font-size: 20px;
  }
  @media (min-width: 461px) and (max-width: 1024px) {
    font-size: 2vmax;
  }
`
const EstimatedTime = styled(motion.h4)`
  font-size: 2vmax;
  font-weight: 600;
  @media (min-width: 461px) and (max-width: 1024px) {
    font-weight: 500;
    font-size: 50px;
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
  type ILatestRecord = {
    id: string
    ownerId: string
    time: number
    startTime: number
    noOfTimesPaused: number
    secondsCounted: number
    endTime: null | number
  }
  const [latestRecord, setLatestRecord] = useState<ILatestRecord | null>(null)
  async function getLatestRecord() {
    await dbService
      .collection('timer')
      .orderBy('startTime', 'desc')
      .onSnapshot((snapshots) => {
        const dashboard = snapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setLatestRecord(dashboard[0] as any)
      })
  }

  async function updateTimerSeconds() {
    if (latestRecord) {
      await dbService.doc(`timer/${latestRecord.id}`).update({
        secondsCounted,
      })
    }
  }

  useQuery('LatestRecord', getLatestRecord)

  const expiryTimestamp = new Date()
  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire: async () => {
        //await updateTimerSeconds()
        if (latestRecord) {
          await dbService.doc(`timer/${latestRecord.id}`).update({
            secondsCounted,
            endTime: Date.now(),
          })
        }
        console.warn('onExpire called')
        if (isAlarmEnabled) {
          AlarmHandler()
        }
        setSecondsCounted(0)
      },
    })

  useEffect(() => {
    if (!isRunning) {
      setShowingNavigation(false)
      setTimeout(() => {
        setShowingNavigation(true)
      }, 750)
    }
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
            setShowingNavigation={setShowingNavigation}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
            restart={restart}
            pause={pause}
          />
        </CenterContainerClock>
        <EstimatedTimeContainer>
          <EstimatedTimeHeading layout>
            Estimated ending time
          </EstimatedTimeHeading>
          <EstimatedTime layout>{endTime + ''}</EstimatedTime>
        </EstimatedTimeContainer>
      </CenterContainer>
      <RightContainer>
        <BottomRightOptions
          user={user}
          secondsCounted={secondsCounted}
          latestRecord={latestRecord}
          updateTimerSeconds={updateTimerSeconds}
          isRunning={isRunning}
          alarmPlaying={alarmPlaying}
          AlarmHandler={AlarmHandler}
          alarmEnabled={isAlarmEnabled}
          toggleAlarm={toggleAlarm}
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
//
