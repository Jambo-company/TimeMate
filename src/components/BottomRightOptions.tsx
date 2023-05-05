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
  @media (max-width: 461px) {
    align-items: start;
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
  justify-content: space-between;
  align-items: center;
  width: 190px;
`

const SwitchDataInfo = styled.span`
  font-size: 12px;
  color: white;
  width: 100%;
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
  setShowingNavigation: React.Dispatch<React.SetStateAction<boolean>>
  alarmEnabled: boolean
  toggleAlarm: () => void
  notificationEnabled: boolean
  toggleNotification: () => void
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void
  pause: () => void
  resume: () => void
  hours?: number
  minutes?: number
  seconds?: number
}
function BottomRightOptions({
  isRunning,
  setShowingNavigation,
  alarmEnabled,
  toggleAlarm,
  notificationEnabled,
  toggleNotification,
  restart,
  resume,
  pause,
  hours,
  minutes,
  seconds,
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

  useEffect(() => {
    if (isRunning) {
      setShowingNavigation(false)
    } else {
      setShowingNavigation(true)
    }
  }, [isRunning])

  const btnAnimation = useAnimation()

  const [dashboardRecords, setDashboardRecords] = useState<any>([])
  async function saveToDashboard(time: number) {
    const newTimerData = {
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
            console.log('Start timeout for duration of:', totalSelectedTime)
            console.log('prevTime', prevTime)
            resume()
            console.log('nowTime', totalSelectedTime)
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
        {!isRunning &&
          switchItemsArray.map((item, index) => (
            <Switcher
              key={index}
              transition={{ delay: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <SwitchDataInfo>{item.text}</SwitchDataInfo>
              <ToogleSwitch
                switchState={item.switchState}
                toogleFunction={item.toogleFunction}
              />
            </Switcher>
          ))}
      </AnimatePresence>

      <TextTimerContainer>
        {[hours, minutes, seconds].map((timeCategory, index) => (
          <TextTimer
            key={index}
            layoutId={index + ''}
            transition={{ delay: 0.3 }}
            animate={{ fontSize: isRunning ? '85px' : '45px' }}
            exit={{ transition: { delay: 0.3 } }}>
            {String(timeCategory).padStart(2, '0')}
          </TextTimer>
        ))}
      </TextTimerContainer>
    </RightContainerData>
  )
}

export default BottomRightOptions
