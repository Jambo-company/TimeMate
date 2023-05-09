import React, { useState } from 'react'
import {
  IDashboardRecords,
  displayTimeFormat,
  getHoursPerEachDay,
  getLogsPeriod,
  getTotalHoursInPeriod,
} from '../../utilities'
import styled from 'styled-components'
import { Chrono } from 'react-chrono'
import { TimelineItemModel } from 'react-chrono/dist/models/TimelineItemModel'
import { useRecoilValue } from 'recoil'
import { EnumColors, displayFillColor } from '../../atom'

const Wrapper = styled.main`
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
  const [itemSelected, setItemSelected] = useState<TimelineItemModel | null>(
    null
  )
  const selectedRecords = dashboardRecords.filter(
    (record) =>
      new Date(record.startTime).toLocaleDateString() === itemSelected?.date
  )
  const currentColor = useRecoilValue(displayFillColor)
  return (
    <Wrapper>
      <ChronoContainer>
        <TimelineHeading>
          {displayTimeFormat(displayingTime.timeCounted)} this week
        </TimelineHeading>
        <Chrono
          items={getLogsPeriod(7).map((day) => {
            const { hrsPerDay } = getHoursPerEachDay(day, dashboardRecords)
            function constructItems(
              date: number | string,
              timeSet: number,
              timeCounted: number
            ) {
              return {
                date,
                cardTitle: 'Timemate',
                cardSubtitle: `Total time set and counted in this date, Click to show more`,
                cardDetailedText: `Time Set: ${displayTimeFormat(
                  timeSet
                )}, Time Counted: ${displayTimeFormat(timeCounted)}`,
              }
            }
            return constructItems(day, hrsPerDay.timeSet, hrsPerDay.timeCounted)
          })}
          mode="VERTICAL"
          darkMode={true}
          cardHeight={75}
          hideControls={true}
          theme={{
            cardTitleColor: currentColor,
            titleColor: 'white',
            titleColorActive: 'white',
            primary: EnumColors.BLACK,
            secondary: "red",
            cardDetailsColor: currentColor,
          }}
          onItemSelected={(data) => {
            setItemSelected(data)
          }}
          contentDetailsHeight={70}
          timelinePointShape="diamond"
        />
      </ChronoContainer>
    </Wrapper>
  )
}

export default Logs
