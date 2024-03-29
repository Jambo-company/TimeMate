export const toSeconds = (hrs: number, mins: number, secs: number) => {
  return hrs * 3600 + mins * 60 + secs
}

export function toHoursAndMinutes(totalSeconds: number) {
  const totalMinutes = Math.floor(totalSeconds / 60)

  const seconds = totalSeconds % 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { hrs: hours, mins: minutes, secs: seconds }
}

/// Get the last dates from today. Example: The dates of the last seven days from today
export function getPeriodDates(i: number) {
  const now = new Date()
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - i
  ).toLocaleDateString()
}
export function getLogsPeriod(noOfDays: number) {
  let logPeriod = []
  for (let i = 0; i < noOfDays; i++) {
    logPeriod.push(getPeriodDates(i))
  }
  return logPeriod
}

/// Get hours per one day
export type IDashboardRecords = {
  ownerId: string
  time: number
  secondsCounted: number
  noOfTimesPaused: number
  startTime: number
  endTime: null
}
export function getHoursPerEachDay(
  dateToCompareWith: string,
  dashboardData: IDashboardRecords[]
) {
  let currentData
  let hrsPerDay = {
    timeSet: 0,
    timeCounted: 0,
  }
  for (let i = 0; i < dashboardData.length; i++) {
    if (
      new Date(dashboardData[i].startTime).toLocaleDateString() ===
      dateToCompareWith
    ) {
      currentData = dashboardData[i]
      /* hrsPerDay = hrsPerDay + dashboardData[i].time */
      hrsPerDay = {
        timeSet: hrsPerDay.timeSet + dashboardData[i].time,
        timeCounted: hrsPerDay.timeCounted + dashboardData[i].secondsCounted,
      }
    }
  }
  return { currentData, hrsPerDay }
}

/// Get total hours in a long period of time from today. Example: one Month or Week from today
export function getTotalHoursInPeriod(
  noOfDays: number,
  dashboard: IDashboardRecords[]
) {
  let recordsArr: any = []
  getLogsPeriod(noOfDays).map((day) => {
    const { hrsPerDay } = getHoursPerEachDay(day, dashboard)
    recordsArr.push(hrsPerDay)
    return null
  })
  let totalHrs = {
    timeSet: 0,
    timeCounted: 0,
  }
  for (let i = 0; i < recordsArr.length; i++) {
    /* totalHrs = totalHrs + recordsArr[i] */
    totalHrs = {
      timeSet: totalHrs.timeSet + recordsArr[i].timeSet,
      timeCounted: totalHrs.timeCounted + recordsArr[i].timeCounted,
    }
  }
  return totalHrs
}

/// Show hours to the screen format
export function displayTimeFormat(seconds: number) {
  const { hrs, mins, secs } = toHoursAndMinutes(seconds)
  return `${hrs ? (hrs === 1 ? hrs + 'hr' : hrs + 'hrs') : ''}
  ${mins ? mins + 'min' : ''}
${secs ? secs + 'sec' : ''}
${!hrs && !mins && !secs ? '0sec' : ''}`
}
