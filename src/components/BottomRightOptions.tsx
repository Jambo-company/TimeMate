import styled from 'styled-components'
import ToogleSwitch from './ToogleSwitch'
import { useRecoilValue } from 'recoil'
import { selectedTime } from '../atom'
import { accentColor } from './globals'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { dbService } from '../firebase'
import { User } from 'firebase/auth'

const RightContainerData = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
  padding-right: 45px;
  position: fixed;
  bottom: 0;
  right: 0;
  width: inherit;
  /* background-color: red; */
  @media (max-width: 461px) {
    padding: 10px;
    width: 100%;
  }
  @media (min-width: 461px) and (max-width: 1024px) {
    /* background-color: red; */
    width: 35%;
  }
`
const StartOrPauseBtn = styled(motion.button)`
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    border: none;
    padding: 12px 22px;
    background-color: ${accentColor};
  }
`
const startOrPauseVars = {
  hide: {
    transition: { duration: 0 },
    opacity: 0,
  },
  show: {
    transition: { duration: 0.7 },
    opacity: 1,
  },
}

const Switcher = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  /* background-color: black; */
  @media (max-width: 461px) {
    width: 100%;
  }
  @media (min-width: 461px) and (max-width: 1024px) {
    width: 100%;
  }
`

const SwitchDataInfo = styled.span`
  font-size: 18px;
  color: white;
  /* width: 100%; */
  /* background-color: yellow; */
  margin-right: 10%;

  @media (min-width: 461px) and (max-width: 1024px) {
    font-size: 2vmax;
  }
  @media (max-width: 461px) {
    font-size: 15px;
  }
`

const TextTimerContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const TextTimer = styled(motion.span)`
  font-weight: lighter;
  font-size: 45px;
`

interface BottomRightOptionsProps {
  user: User | null
  isRunning: boolean
  alarmPlaying: boolean
  AlarmHandler: (action: 'Play' | 'Stop') => void
  alarmEnabled: boolean
  toggleAlarm: () => void
  notificationEnabled: boolean
  toggleNotification: () => void
  pause: () => void
  resume: () => void
  hours?: number
  minutes?: number
  seconds?: number
  setEndTime: React.Dispatch<React.SetStateAction<string | number>>
}
function BottomRightOptions({
  user,
  isRunning,
  alarmPlaying,
  AlarmHandler,
  alarmEnabled,
  toggleAlarm,
  notificationEnabled,
  toggleNotification,
  resume,
  pause,
  hours,
  minutes,
  seconds,
  setEndTime,
}: BottomRightOptionsProps) {
  const totalSelectedTime = useRecoilValue(selectedTime)

  const [prevTime, setPrevTime] = useState(0)
  useEffect(() => {
    setPrevTime(0)
    getDashboardData()
  }, [])

  const switchItemsArray = [
    {
      text: 'Activate alarm sound',
      switchState: alarmEnabled,
      toogleFunction: toggleAlarm,
    },
    {
      text: 'Activate push notification',
      switchState: notificationEnabled,
      toogleFunction: toggleNotification,
    },
  ]

  const btnAnimation = useAnimation()

  const [dashboardRecords, setDashboardRecords] = useState<any>([])
  async function saveToDashboard(time: number) {
    const newTimerData = {
      ownerId: user?.uid,
      time,
      startTime: Date.now(),
      endTime: null,
    }
    await dbService.collection('timer').add(newTimerData)
  }
  async function getDashboardData() {
    await dbService.collection('timer').onSnapshot((snapshots) => {
      const dashboard = snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setDashboardRecords(dashboard)
    })
  }
  return (
    <RightContainerData>
      <StartOrPauseBtn
        variants={startOrPauseVars}
        animate={btnAnimation}
        layoutId="start-pause-btn"
        onClick={async () => {
          if (hours === 0 && minutes === 0 && seconds === 0) {
            return
          }
          if (isRunning) {
            pause()
          } else {
            const date = new Date(Date.now() + totalSelectedTime * 1000)
            const time = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            const seconds = String(date.getSeconds()).padStart(2, '0')
            setEndTime(`${time}:${minutes}:${seconds}`)
            resume()
            if (prevTime !== totalSelectedTime) {
              console.log('Save Dashboard')
              await saveToDashboard(totalSelectedTime)
              await getDashboardData()
            }
            setPrevTime(totalSelectedTime)
          }
          btnAnimation.start('hide')
          setTimeout(() => {
            btnAnimation.start('show')
          }, 700)
        }}>
        {isRunning ? 'Pause' : 'Start Focus'}
      </StartOrPauseBtn>
      <AnimatePresence initial={false}>
        {!isRunning && !alarmPlaying && (
          <Switcher
            transition={{ delay: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <SwitchDataInfo>Activate alarm sound</SwitchDataInfo>
            <ToogleSwitch
              switchState={alarmEnabled}
              toogleFunction={toggleAlarm}
            />
          </Switcher>
        )}
      </AnimatePresence>

      <TextTimerContainer>
        {[hours, minutes, seconds].map((timeCategory, index) => (
          <TextTimer
            key={index}
            layoutId={index + ''}
            transition={{ delay: 0.3 }}
            animate={{
              fontSize:
                isRunning || alarmPlaying
                  ? window.innerWidth <= 461
                    ? '85px'
                    : '95px'
                  : '60px',
            }}
            exit={{ transition: { delay: 0.3 } }}>
            {String(timeCategory).padStart(2, '0')}
          </TextTimer>
        ))}
      </TextTimerContainer>
    </RightContainerData>
  )
}

export default BottomRightOptions
