import React from 'react'
import {
  IDashboardRecords,
  displayTimeFormat,
  getPeriodDates,
  getTotalHoursInPeriod,
} from '../../utilities'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import '../heatmap.css'
import CalendarHeatmap from 'react-calendar-heatmap'
import { useRecoilValue } from 'recoil'
import { displayFillColor } from '../../atom'

const DashboardDetails = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50vh;
`
const DashboardDetailsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 56%;
  @media (max-width: 461px) {
    width: 100%;
    padding: 0px 20px;
    min-height: 95vh;
  }
`

const DashboardDetailsHeader = styled(motion.div)`
  margin-top: 100px;
`

const DashboardDetailsTitle = styled(motion.h1)`
  font-size: 40px;
  @media (max-width: 461px) {
    font-size: 25px;
  }
`
const DashboardDetailsSubTitle = styled(motion.h1)`
  font-size: 25px;
  font-weight: 100;
  margin-top: 20px;
  @media (max-width: 461px) {
    font-size: 15px;
  }
`

const DayTracker = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 65px;
  @media (max-width: 461px) {
    margin-top: 20px;
    height: 90px;
  }
`
const DayTrackerTime = styled(motion.span)<{ currentcolor: string }>`
  color: ${({ currentcolor }) => currentcolor};
  font-size: 95px;
  display: flex;
  h1 {
    font-size: 40px;
    margin-top: 40px;
    margin-left: 15px;
  }
  @media (max-width: 461px) {
    font-size: 37px;
    h1 {
      font-size: 20px;
      margin-top: 25px;
      margin-left: 10px;
    }
  }
`
const DayTrackerInfo = styled(motion.span)`
  margin-top: 20px;
  font-size: 33px;
  font-weight: 200;
  @media (max-width: 461px) {
    font-size: 18px;
    margin-top: 10px;
  }
`
const DailyTracker = styled(motion.div)`
  display: flex;
  align-items: center;
  height: 135px;
  margin-top: 25px;

  @media (max-width: 461px) {
    margin-top: 20px;
    flex-direction: column;
    align-items: start;
    min-height: 50vh;
  }
`

const DailyTrackerObj = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 100px;
  h1 {
    font-size: 20px;
    margin-top: 30px;
    margin-left: 5px;
  }
  @media (max-width: 461px) {
    flex-direction: column;
    margin-top: 50px;
    height: 100px;
    width: 100%;
    h1 {
      font-size: 15px;
      margin-top: 20px;
      margin-left: 5px;
    }
  }
`
const DailyTrackerObjTime = styled(motion.span)<{ currentcolor: string }>`
  color: ${({ currentcolor }) => currentcolor};
  font-size: 45px;
  display: flex;
  width: 400px;
  @media (max-width: 461px) {
    width: 245px;
    display: flex;
    font-size: 30px;
  }
`
const DailyTrackerObjInfo = styled(motion.span)`
  margin-top: 17px;
  font-size: 30px;
  font-weight: 100;
  @media (max-width: 461px) {
    font-size: 15px;
  }
`

const TimeTableHeading = styled.h3`
  font-size: 35px;
  margin-top: 75px;
`
const HeatMapContainer = styled.div`
  width: 85%;
  margin: 75px 0px;
`

const BehavioursContainer = styled.div`
  margin-top: 45px;
`
const BehaviourHeading = styled(DailyTrackerObjInfo)`
  font-size: 33px;
  font-weight: 550;
`

const scrollVariants = {
  inactive: {
    opacity: 0,
  },
  active: {
    opacity: 1,
    transition: { duration: 4.5 },
  },
  leaving: {
    opacity: 0,
  },
}

interface OverviewProps {
  dashboardRecords: IDashboardRecords[]
}
function Overview({ dashboardRecords }: OverviewProps) {
  const heatmapValues = dashboardRecords.map((record) => {
    return {
      date: new Date(record.startTime).toLocaleString(),
      count: record.secondsCounted,
    }
  })

  const todayRecords = dashboardRecords.filter(
    (record) =>
      new Date(record.startTime).toLocaleDateString() ===
      new Date(Date.now()).toLocaleDateString()
  )
  let totalHrsToday = {
    timeSet: 0,
    timeCounted: 0,
  }
  for (let i = 0; i < todayRecords.length; i++) {
    totalHrsToday = {
      timeSet: totalHrsToday.timeSet + todayRecords[i].time,
      timeCounted: totalHrsToday.timeCounted + todayRecords[i].secondsCounted,
    }
  }

  const { timeSet: timeSetInWeek, timeCounted: timeCountedInWeek } =
    getTotalHoursInPeriod(7, dashboardRecords)
  const { timeSet: timeSetInMonth, timeCounted: timeCountedInMonth } =
    getTotalHoursInPeriod(31, dashboardRecords)

  const currentColor = useRecoilValue(displayFillColor)
  const root = document.querySelector(':root')
  //@ts-ignore
  const rootStyles = getComputedStyle(root)
  var fill = rootStyles.getPropertyValue('--fill')
  //@ts-ignore
  root.style.setProperty('--fill', currentColor)

  const notPausedRecords = dashboardRecords.filter(
    (record) => record.noOfTimesPaused === 0
  )

  var longestDuration = 0
  if (dashboardRecords.length !== 0) {
    longestDuration = dashboardRecords[0].secondsCounted
    for (var i = 0; i < dashboardRecords.length; i++) {
      if (longestDuration < dashboardRecords[i].secondsCounted) {
        longestDuration = dashboardRecords[i].secondsCounted
      }
    }
  }

  return (
    <DashboardDetails>
      <DashboardDetailsWrapper>
        <DashboardDetailsHeader>
          <DashboardDetailsTitle>Total Time</DashboardDetailsTitle>
          <DashboardDetailsSubTitle>
            Your brief records overview
          </DashboardDetailsSubTitle>
        </DashboardDetailsHeader>
        <DayTracker
          variants={scrollVariants}
          initial="inactive"
          whileInView="active"
          viewport={{ once: true }}
          exit="leaving">
          <DayTrackerTime currentcolor={currentColor}>
            {displayTimeFormat(totalHrsToday.timeCounted)}
          </DayTrackerTime>
          <DayTrackerInfo>For today</DayTrackerInfo>
        </DayTracker>
        <DailyTracker
          variants={scrollVariants}
          initial="inactive"
          whileInView="active"
          viewport={{ once: true }}
          exit="leaving">
          <DailyTrackerObj>
            <DailyTrackerObjTime currentcolor={currentColor}>
              {displayTimeFormat(timeCountedInWeek)}
            </DailyTrackerObjTime>
            <DailyTrackerObjInfo>For a week</DailyTrackerObjInfo>
          </DailyTrackerObj>
          <DailyTrackerObj>
            <DailyTrackerObjTime currentcolor={currentColor}>
              {displayTimeFormat(timeCountedInMonth)}
            </DailyTrackerObjTime>
            <DailyTrackerObjInfo>For a Month</DailyTrackerObjInfo>
          </DailyTrackerObj>
        </DailyTracker>
        <TimeTableHeading>Time Table</TimeTableHeading>
        <TimeTableHeading
          as="h4"
          style={{ fontWeight: 300, fontSize: 20, marginTop: 25 }}>
          Visualize your recorder times per day
        </TimeTableHeading>
        <HeatMapContainer>
          <CalendarHeatmap
            startDate={getPeriodDates(265)}
            endDate={new Date(Date.now())}
            onClick={(value) => console.log(value)}
            values={heatmapValues}
          />
        </HeatMapContainer>
        <BehavioursContainer>
          <BehaviourHeading as="h3">Behaviours</BehaviourHeading>
          <BehaviourHeading as="h4" style={{ fontWeight: 200, fontSize: 20 }}>
            We also collect your timing behaviours
          </BehaviourHeading>
          <DailyTracker
            style={{ marginTop: 75 }}
            variants={scrollVariants}
            initial="inactive"
            whileInView="active"
            viewport={{ once: true }}
            exit="leaving">
            <DailyTrackerObj>
              <DailyTrackerObjTime currentcolor={currentColor}>
                {Math.round(
                  (notPausedRecords.length / dashboardRecords.length) * 100
                )}
                %
              </DailyTrackerObjTime>
              <DailyTrackerObjInfo style={{ fontSize: 20, marginTop: 10 }}>
                Finish timing without pause (Overall)
              </DailyTrackerObjInfo>
            </DailyTrackerObj>
            <DailyTrackerObj>
              <DailyTrackerObjTime currentcolor={currentColor}>
                {displayTimeFormat(longestDuration)}
              </DailyTrackerObjTime>
              <DailyTrackerObjInfo style={{ fontSize: 20, marginTop: 10 }}>
                Longest Timing duration (Overall)
              </DailyTrackerObjInfo>
            </DailyTrackerObj>
          </DailyTracker>
        </BehavioursContainer>
      </DashboardDetailsWrapper>
    </DashboardDetails>
  )
}

export default Overview
