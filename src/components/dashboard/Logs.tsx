import React from 'react'
import {
  IDashboardRecords,
  displayTimeFormat,
  getHoursPerEachDay,
  getLogsPeriod,
  getTotalHoursInPeriod,
} from '../../utilities'
import styled from 'styled-components'
import { Chrono } from 'react-chrono'

const LogsDetailsWrapper = styled.main`
  height: 90vh;
  margin-top: 3%;
  margin-left: 1.5%;
  @media (max-width: 461px) {
  }
`
const ChronoContainer = styled.div`
  height: 95%;
  width: 45%;
  margin-left: -2.5%;
  @media (max-width: 461px) {
    width: 100%;
  }
`
const TimelineHeading = styled.h2`
  font-size: 27px;
  margin-left: 4%;
  margin-bottom: 3%;
`

interface LogsProps {
  dashboardRecords: IDashboardRecords[]
}
function Logs({ dashboardRecords }: LogsProps) {
  const displayingTime = getTotalHoursInPeriod(7, dashboardRecords)
  return (
    <LogsDetailsWrapper>
      <ChronoContainer>
        <TimelineHeading>
          {displayTimeFormat(displayingTime)} this week
        </TimelineHeading>
        <Chrono
          items={getLogsPeriod(7).map((day) => {
            const { currentData, hrsPerDay } = getHoursPerEachDay(
              day,
              dashboardRecords
            )
            function constructItems(date: number | string, time: number) {
              return {
                id: currentData?.startTime + '',
                date,
                cardTitle: 'Timemate',
                cardSubtitle: `Total time set in this date, Click to show more`,
                cardDetailedText: displayTimeFormat(time),
              }
            }
            return constructItems(day, hrsPerDay)
          })}
          mode="VERTICAL"
          darkMode={true}
          cardHeight={75}
          hideControls={true}
          theme={{
            cardTitleColor: 'yellow',
            secondary: 'yellow',
          }}
          onItemSelected={(data) => console.log(data)}
          contentDetailsHeight={70}
          timelinePointShape="diamond"
        />
      </ChronoContainer>
    </LogsDetailsWrapper>
  )
}

export default Logs
