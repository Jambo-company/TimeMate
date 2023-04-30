import { useEffect, useState } from 'react'
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
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

const TimeInputFieldSet = styled.fieldset`
  width: 100%;
  position: absolute;
  top: -25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const MinimumTime = styled.span``
const MaximumTime = styled(MinimumTime)``
const TimeInput = styled.input`
  width: 80%;
`

const CircularBarHolder = styled.div`
  width: 350px;
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

  useEffect(() => {
    setCurrentTime(toSeconds(hours, minutes, seconds))
    setPercentage((currentTime / maxTimeOut) * 100)
    if (!isRunning && percentage === 0) {
      setPercentage(0)
    }
  }, [seconds, minutes])
  return (
    <AnlogueTimerContainer>
      <TimeInputFieldSet>
        <MinimumTime>0min</MinimumTime>
        <TimeInput
          value={totalSelectedTime}
          type="range"
          min={0}
          max={maxTimeOut}
          onChange={(event) => {
            const time = new Date()
            time.setSeconds(time.getSeconds() + +event.target.value)
            restart(time)
            setTotalSelectedTime(+event.target.value)
            setCurrentTime(+event.target.value)
            setPercentage((currentTime / maxTimeOut) * 100)
            pause()
          }}
        />
        <MaximumTime>
          {toHours(maxTimeOut)}
          {toHours(maxTimeOut) === 1 ? 'hr' : 'hrs'}
        </MaximumTime>
      </TimeInputFieldSet>
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
          })}></CircularProgressbarWithChildren>
      </CircularBarHolder>
    </AnlogueTimerContainer>
  )
}

export default AnalogueTimer
