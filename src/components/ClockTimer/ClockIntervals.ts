export function useClockIntervals(maxTime: number) {
  console.log('Clock Interval maxTime', maxTime)
  const tenMin = maxTime === 600
  const halfHr = maxTime === 1800
  const oneHr = maxTime === 3600
  const twoHrs = maxTime === 7200
  const fourHrs = maxTime === 14400
  const sixHrs = maxTime === 21600
  const twelveHrs = maxTime === 43200
  const oneDay = maxTime === 86400
  // **** Clock Numbers ****
  const initialNumber = {
    number: tenMin
      ? 10
      : halfHr
      ? 30
      : oneHr
      ? 60
      : twoHrs
      ? 120
      : fourHrs
      ? 240
      : sixHrs
      ? 360
      : twelveHrs
      ? 720
      : oneDay
      ? 1440
      : 60,
    rotateDeg: 0,
  }
  const incrementNumber = {
    number: tenMin
      ? 2.5
      : halfHr
      ? 2.5
      : oneHr
      ? 5
      : twoHrs
      ? 10
      : fourHrs
      ? 20
      : sixHrs
      ? 30
      : twelveHrs
      ? 60
      : oneDay
      ? 120
      : 5,
    rotateDeg: tenMin ? 90 : 30,
  }
  const numObjects = tenMin ? 4 : 12

  interface INumberObj {
    number: number
    rotateDeg: number
  }
  type ITimerIntervals = INumberObj[]
  let timerIntervals: ITimerIntervals = []
  for (let i = 0; i < numObjects; i++) {
    const lastValue: INumberObj =
      i === 0 ? initialNumber : timerIntervals[i - 1]
    const newObject: INumberObj = {
      number: lastValue.number - incrementNumber.number,
      rotateDeg: lastValue.rotateDeg + incrementNumber.rotateDeg,
    }
    timerIntervals.push(newObject)
  }

  // **** Clock Markings ****
  const initialMarkings = { rotateDeg: 0 }
  const incrementMarkings = { rotateDeg: tenMin ? 18 : 6 }
  const numMarkings = tenMin ? 10 : 30

  interface IMarkingsObj {
    rotateDeg: number
  }
  type ITimerMarkings = IMarkingsObj[]
  let timerMarkings: ITimerMarkings = []
  for (let i = 0; i < numMarkings; i++) {
    const lastValue: IMarkingsObj =
      i === 0 ? initialMarkings : timerMarkings[i - 1]
    const newObject: IMarkingsObj = {
      rotateDeg: lastValue.rotateDeg + incrementMarkings.rotateDeg,
    }
    timerMarkings.push(newObject)
  }

  return { timerIntervals, timerMarkings }
}
