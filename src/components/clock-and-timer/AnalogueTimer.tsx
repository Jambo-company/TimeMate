import { useEffect, useState } from 'react'
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import CircularSlider from '@fseehawer/react-circular-slider'
import { toSeconds } from '../../utilities'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  currentTimeValue,
  displayFillColor,
  maxTime,
  rotationInterval,
  selectedTime,
} from '../../atom'
import ClockUnits from './ClockUnits'

const AnlogueTimerContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CircularBarHolder = styled.div`
  width: 95%;
  border-radius: 50%;
  overflow: hidden;
`

const ClockCenter = styled.div`
  position: absolute;
  height: 15%;
  width: 15%;
  border-radius: 50%;
  background-color: white;
`
const TimerArrowHolder = styled.div`
  position: absolute;
  height: 30%;
  width: 2%;
  background-color: transparent;
`
const TimerArrow = styled.div`
  width: 100%;
  height: 45%;
  background-color: white;
  border-radius: 1.7;
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
  const interval = useRecoilValue(rotationInterval)
  const fillColor = useRecoilValue(displayFillColor)

  const [percentage, setPercentage] = useState(0)
  const [totalSelectedTime, setTotalSelectedTime] = useRecoilState(selectedTime)
  useEffect(() => {
    if (totalSelectedTime === 0) {
      setPercentage(0)
    }
  }, [totalSelectedTime])

  const [currentTime, setCurrentTime] = useRecoilState(currentTimeValue)
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

  const [timer, setTimer] = useState(true)
  useEffect(() => {
    setTimer(false)
    setTimeout(() => setTimer(true), 1)
  }, [maxTimeOut])

  return (
    <ClockUnits
      children={
        <AnlogueTimerContainer>
          <CircularBarHolder>
            <CircularProgressbarWithChildren
              strokeWidth={50}
              counterClockwise={true}
              value={percentage}
              styles={buildStyles({
                pathColor: fillColor,
                trailColor: 'rgba(30, 30, 30, 0.75)',
                rotation: 1,
                strokeLinecap: 'butt',
                pathTransition: 'none',
                pathTransitionDuration: 0.01,
              })}>
              <TimerArrowHolder
                style={{
                  transform: `rotateZ(-${(percentage / 100) * 360}deg)`,
                }}>
                <TimerArrow />
              </TimerArrowHolder>
              <ClockCenter />

              <div style={{ opacity: 0 }}>
                {timer && (
                  <CircularSlider
                    direction={-1}
                    hideLabelValue={true}
                    knobSize={window.innerWidth <= 461 ? 185 : 450}
                    width={window.innerWidth <= 461 ? 50 : 100}
                    min={0}
                    max={maxTimeOut}
                    trackColor="rgba(0, 0, 0, 0.25)"
                    progressColorFrom={fillColor}
                    progressColorTo={fillColor}
                    progressLineCap="flat"
                    hideKnob={true}
                    onChange={(value: number) => {
                      setPercentage((value / maxTimeOut) * 100)
                      setTotalSelectedTime(value)
                      setCurrentTime(value)
                      const time = new Date()
                      time.setSeconds(time.getSeconds() + value)
                      restart(time)
                      pause()
                    }}
                  />
                )}
              </div>
            </CircularProgressbarWithChildren>
          </CircularBarHolder>
        </AnlogueTimerContainer>
      }
    />
  )
}

export default AnalogueTimer
