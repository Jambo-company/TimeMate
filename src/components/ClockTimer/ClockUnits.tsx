import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { currentTimeValue, maxTime } from '../../atom'
import { useClockIntervals } from './ClockIntervals'
import { toFraction } from 'fraction-parser'

const Container = styled.div`
  width: 425px;
  height: 425px;
  background-color: transparent;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  @media (max-width: 461px) {
    width: 275px;
    height: 275px;
  }
  @media (max-width: 355px) {
    width: 200px;
    height: 200px;
  }
`

const Number = styled.div<{ rotation: number }>`
  --rotation: 0;
  position: absolute;
  width: 100%;
  height: 103%;
  text-align: center;
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
  color: #5d5b5b;
`

const Clockunits = styled.div`
  width: 90%;
  height: 85%;
  position: relative;
  padding: 2rem;
  border-radius: 50%;
  margin: 50px auto;
`
const OuterClockFace = styled.div`
  position: relative;
  background: transparent;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  ::after {
    transform: rotate(90deg);
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: #fff;
    z-index: 0;
    left: 49%;
  }
  ::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: #fff;
    z-index: 0;
    left: 49%;
  }
`

const Mask = styled.div`
  position: absolute;
  margin: auto;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 90%;
  width: 90%;
  border-radius: 50%;
  background-color: rgba(35, 35, 35, 1);
`

const Marking = styled.div<{ rotation: number }>`
  content: '';
  position: absolute;
  width: 3px;
  height: 100%;
  background: #fff;
  z-index: 0;
  left: 49%;
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
`

function ClockUnits({ children }: any) {
  const currentTime = useRecoilValue(currentTimeValue)
  const currentMinute = currentTime / 60

  const maximumTime = useRecoilValue(maxTime)
  const { timerIntervals, timerMarkings } = useClockIntervals(maximumTime)
  return (
    <Container>
      {timerIntervals.map((time, index) => (
        <Number
          rotation={time.rotateDeg}
          key={index}
          style={{ color: currentMinute >= time.number ? 'white' : '' }}>
          {toFraction(time.number, { useUnicodeVulgar: true })}
        </Number>
      ))}

      <Clockunits>
        <OuterClockFace>
          {timerMarkings.map((mark, index) => {
            const secondsArrow =
              mark.rotateDeg !== 30 &&
              mark.rotateDeg !== 60 &&
              mark.rotateDeg !== 90 &&
              mark.rotateDeg !== 120 &&
              mark.rotateDeg !== 150 &&
              mark.rotateDeg !== 180
            return (
              <Marking
                key={index}
                rotation={mark.rotateDeg}
                style={{
                  backgroundColor: secondsArrow ? 'grey' : '',
                  width: secondsArrow ? 1.66 : '',
                }}
              />
            )
          })}
          <Mask />
          {children}
        </OuterClockFace>
      </Clockunits>
    </Container>
  )
}

export default ClockUnits
