import React from 'react'
import { IDashboardRecords, displayTimeFormat } from '../../utilities'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const DashboardDetails = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 45vh;
`
const DashboardDetailsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* background-color: #012d1c; */
  width: 56%;
`

const DashboardDetailsHeader = styled(motion.div)`
  margin-top: 100px;
  height: 100px;
`

const DashboardDetailsTitle = styled(motion.h1)`
  font-size: 40px;
`
const DashboardDetailsSubTitle = styled(motion.h1)`
  font-size: 25px;
  font-weight: 100;
  margin-top: 20px;
`

const DayTracker = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 100px;
`
const DayTrackerTime = styled(motion.span)`
  color: rgba(241, 196, 15, 0.8);
  font-size: 95px;
`
const DayTrackerInfo = styled(motion.span)`
  margin-top: 25px;
  font-size: 33px;
  font-weight: 100;
`
const DailyTracker = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 135px;
  margin-top: 60px;
`
const DailyTrackerObj = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 100px;
`
const DailyTrackerObjTime = styled(motion.span)`
  color: rgba(241, 196, 15, 0.8);
  font-size: 55px;
`
const DailyTrackerObjInfo = styled(motion.span)`
  margin-top: 25px;
  font-size: 33px;
  font-weight: 100;
`
const DashboardDataTitle = styled(motion.h1)`
  font-size: 10px;
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
            <DailyTrackerObjTime>0.0 H</DailyTrackerObjTime>
            <DailyTrackerObjInfo>For a week</DailyTrackerObjInfo>
          </DailyTrackerObj>
          <DailyTrackerObj>
            <DailyTrackerObjTime>0.0 H</DailyTrackerObjTime>
            <DailyTrackerObjInfo>For a Month</DailyTrackerObjInfo>
          </DailyTrackerObj>
          <DailyTrackerObj>
            <DailyTrackerObjTime>0.0 H</DailyTrackerObjTime>
            <DailyTrackerObjInfo>For whole days</DailyTrackerObjInfo>
          </DailyTrackerObj>
        </DailyTracker>
      </DashboardDetailsWrapper>
    </DashboardDetails>
  )
}

export default Overview
