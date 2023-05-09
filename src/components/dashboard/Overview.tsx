import React from 'react'
import {
  IDashboardRecords,
  displayTimeFormat,
  getTotalHoursInPeriod,
} from '../../utilities'
import styled from 'styled-components'
import { motion } from 'framer-motion'

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
  height: 100px;
  @media (max-width: 461px) {
    height: 70px;
  }
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
  margin-top: 100px;
  @media (max-width: 461px) {
    margin-top: 20px;
    height: 90px;
  }
`
const DayTrackerTime = styled(motion.span)`
  color: rgba(241, 196, 15, 0.8);
  font-size: 95px;
  display: flex;
  h1 {
    font-size: 40px;
    margin-top: 40px;
    margin-left: 15px;
  }
  @media (max-width: 461px) {
    font-size: 50px;
    h1 {
      font-size: 20px;
      margin-top: 25px;
      margin-left: 10px;
    }
  }
`
const DayTrackerInfo = styled(motion.span)`
  margin-top: 25px;
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
  margin-top: 60px;

  @media (max-width: 461px) {
    margin-top: 20px;
    flex-direction: column;
    align-items: start;
    min-height: 50vh;
    /* background-color: peachpuff; */
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
const DailyTrackerObjTime = styled(motion.span)`
  color: rgba(241, 196, 15, 0.8);
  font-size: 55px;
  display: flex;
  width: 300px;
  @media (max-width: 461px) {
    width: 100px;
    display: flex;
    font-size: 40px;
  }
`
const DailyTrackerObjInfo = styled(motion.span)`
  margin-top: 25px;
  font-size: 33px;
  font-weight: 100;
  @media (max-width: 461px) {
    font-size: 15px;
  }
`

const scrollVariants = {
  inactive: {
    opacity: 0,
  },
  active: {
    opacity: 1,
    transition: { duration: 8 },
  },
  leaving: {
    opacity: 0,
  },
}

interface OverviewProps {
  dashboardRecords: IDashboardRecords[]
}
function Overview({ dashboardRecords }: OverviewProps) {
  const todayRecords = dashboardRecords.filter(
    (record) =>
      new Date(record.startTime).toLocaleDateString() ===
      new Date(Date.now()).toLocaleDateString()
  )
  let totalHrsToday = 0
  for (let i = 0; i < todayRecords.length; i++) {
    totalHrsToday = totalHrsToday + todayRecords[i].time
  }

  const totalHrsPerWeek = getTotalHoursInPeriod(7, dashboardRecords)
  const totalHrsPerMonth = getTotalHoursInPeriod(31, dashboardRecords)
  return (
    <DashboardDetails>
      <DashboardDetailsWrapper>
        <DashboardDetailsHeader>
          <DashboardDetailsTitle>Total Time</DashboardDetailsTitle>
          <DashboardDetailsSubTitle>
            For only over 10 minutes records
          </DashboardDetailsSubTitle>
        </DashboardDetailsHeader>
        <DayTracker
          variants={scrollVariants}
          initial="inactive"
          whileInView="active"
          viewport={{ once: true }}
          exit="leaving">
          <DayTrackerTime>{displayTimeFormat(totalHrsToday)}</DayTrackerTime>
          <DayTrackerInfo>For today</DayTrackerInfo>
        </DayTracker>
        <DailyTracker
          variants={scrollVariants}
          initial="inactive"
          whileInView="active"
          viewport={{ once: true }}
          exit="leaving">
          <DailyTrackerObj>
            <DailyTrackerObjTime>
              {displayTimeFormat(totalHrsPerWeek)}
            </DailyTrackerObjTime>
            <DailyTrackerObjInfo>For a week</DailyTrackerObjInfo>
          </DailyTrackerObj>
          <DailyTrackerObj>
            <DailyTrackerObjTime>
              {displayTimeFormat(totalHrsPerMonth)}
            </DailyTrackerObjTime>
            <DailyTrackerObjInfo>For a Month</DailyTrackerObjInfo>
          </DailyTrackerObj>
        </DailyTracker>
      </DashboardDetailsWrapper>
    </DashboardDetails>
  )
}

export default Overview
