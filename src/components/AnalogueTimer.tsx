import { useEffect, useState } from 'react'
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import CircularSlider from '@fseehawer/react-circular-slider'
import { toHours, toSeconds } from '../utilities'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  currentTimeValue,
  displayFillColor,
  maxTime,
  selectedTime,
} from '../atom'

const AnlogueTimerContainer = styled.div`
  position: relative;
`

const CircularBarHolder = styled.div`
  width: 350px;
  border-radius: 50%;
  overflow: hidden;
`

interface AnalogueTimerProps {
  hours: number
  minutes: number
  seconds: number
  isRunning: boolean
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void
  pause: () => void
}
function AnalogueTimer({
  hours,
  minutes,
  seconds,
  isRunning,
  restart,
  pause,
}: AnalogueTimerProps) {
  const maxTimeOut = useRecoilValue(maxTime)
  const fillColor = useRecoilValue(displayFillColor)

  const [percentage, setPercentage] = useState(0)
  const [totalSelectedTime, setTotalSelectedTime] = useRecoilState(selectedTime)
  useEffect(() => {
    if (totalSelectedTime === 0) {
      setPercentage(0)
    }
  }, [totalSelectedTime])

  const [currentTime, setCurrentTime] = useRecoilState(currentTimeValue)
  console.log('currentTime', currentTime)

  function updateTtimer() {
    setCurrentTime(toSeconds(hours, minutes, seconds))
    setPercentage((currentTime / maxTimeOut) * 100)
    if (!isRunning && percentage === 0) {
      setPercentage(0)
    }
  }

  useEffect(() => {
    updateTtimer()
  }, [])

  useEffect(() => {
    updateTtimer()
  }, [seconds, minutes])
  return (
    <AnlogueTimerContainer>
      <CircularBarHolder>
        <CircularProgressbarWithChildren
          strokeWidth={50}
          counterClockwise={true}
          value={percentage}
          styles={buildStyles({
            backgroundColor: fillColor,
            pathColor: fillColor,
            trailColor: 'rgba(0, 0, 0, 0.15)',
            rotation: 25,
            strokeLinecap: 'butt',
            pathTransitionDuration: 0.01,
          })}>
          <div style={{ opacity: 0 }}>
            <CircularSlider
              direction={-1}
              progressSize={100}
              knobSize={400}
              width={150}
              min={0}
              max={maxTimeOut}
              progressLineCap="flat"
              hideKnob={false}
              onChange={(value: number) => {
                setPercentage((value / maxTimeOut) * 100)
                const time = new Date()
                time.setSeconds(time.getSeconds() + value)
                restart(time)
                setTotalSelectedTime(value)
                setCurrentTime(value)
                pause()
              }}
            />
          </div>
        </CircularProgressbarWithChildren>
      </CircularBarHolder>
    </AnlogueTimerContainer>
  )
}

export default AnalogueTimer
