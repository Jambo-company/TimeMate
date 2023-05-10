import React, { useEffect, useState } from 'react'
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
  display: flex;
  justify-content: space-between;
  margin-top: 3%;
  margin-left: 1.5%;
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`

const ChronoContainer = styled.div`
  height: 95%;
  width: 47%;
  margin-left: -3.5%;
  @media (max-width: 1024px) {
    width: 100%;
  }
`
const TimelineHeading = styled.h2`
  font-size: 27px;
  margin-left: 5%;
  margin-bottom: 3%;
  display: flex;
  align-items: flex-end;
  min-width: 425px;
`
const Select = styled.select<{ currentcolor: string }>`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${({ currentcolor }) => currentcolor};
  display: flex;
  align-items: center;
  font-size: 23px;
  width: fit-content;
  margin-left: 3px;
  width: fit-content;
`

const DetailsContainer = styled.section`
  width: 45%;
  gap: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    width: 100%;
  }
`
const DataTitle = styled.h3`
  align-self: flex-start;
  margin-left: 1%;
  font-size: 17px;
`
const MoreDetails = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${EnumColors.BLACK};
  width: 97%;
  height: 65px;
  margin-left: 1%;
  margin-top: -15px;
  padding: 5px 3px;
  border-radius: 10px;
`
const DetailField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100px;
`
const FieldTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`
const FieldData = styled.span<{ currentcolor: string }>`
  font-weight: 300;
  text-align: center;
  font-size: 13px;
  color: ${({ currentcolor }) => currentcolor};
`

interface LogsProps {
  dashboardRecords: IDashboardRecords[]
}
function Logs({ dashboardRecords }: LogsProps) {
  const [renderChrono, setRenderChrono] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState(7)
  useEffect(() => {
    setRenderChrono(false)
    setTimeout(() => {
      setRenderChrono(true)
    }, 1)
  }, [selectedPeriod])

  const displayingTime = getTotalHoursInPeriod(selectedPeriod, dashboardRecords)
  const [itemSelected, setItemSelected] = useState<TimelineItemModel | null>(
    null
  )
  const selectedRecords = dashboardRecords.filter(
    (record) =>
      new Date(record.startTime).toLocaleDateString() === itemSelected?.date
  )
  console.log(selectedRecords)
  const currentColor = useRecoilValue(displayFillColor)
  return (
    <Wrapper>
      <ChronoContainer>
        <TimelineHeading>
          Counted
          {displayTimeFormat(displayingTime.timeCounted)}
          <Select
            currentcolor={currentColor}
            inlist={false}
            id="period-select"
            defaultValue={7}
            onChange={(event) => setSelectedPeriod(+event.currentTarget.value)}>
            <option value={1}>Today</option>
            <option value={2}>Today and Yesterday</option>
            <option value={3}>Last 3 days</option>
            <option value={4}>Last 4 days</option>
            <option value={5}>Last 5 days</option>
            <option value={7}>This Week</option>
            <option value={30}>This Month</option>
            <option value={365}>Full Year</option>
          </Select>
        </TimelineHeading>
        {renderChrono && (
          <Chrono
            items={getLogsPeriod(selectedPeriod).map((day) => {
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
              return constructItems(
                day,
                hrsPerDay.timeSet,
                hrsPerDay.timeCounted
              )
            })}
            mode="VERTICAL"
            darkMode={true}
            cardHeight={75}
            hideControls={true}
            theme={{
              cardTitleColor: 'white',
              titleColor: 'white',
              titleColorActive: 'white',
              primary: EnumColors.BLACK,
              secondary: 'grey',
              cardDetailsColor: currentColor,
            }}
            onItemSelected={(data) => {
              setItemSelected(data)
            }}
            contentDetailsHeight={70}
            timelinePointShape="diamond"
          />
        )}
      </ChronoContainer>
      <DetailsContainer>
        {selectedRecords.map((record) => (
          <>
            <DataTitle>
              Time: {new Date(record.startTime).toLocaleTimeString()}
            </DataTitle>
            <MoreDetails>
              <DetailField>
                <FieldTitle>Selected Time</FieldTitle>
                <FieldData currentcolor={currentColor}>
                  {displayTimeFormat(record.time)}
                </FieldData>
              </DetailField>
              <DetailField>
                <FieldTitle>Completed Timer</FieldTitle>
                <FieldData currentcolor={currentColor}>
                  {record.endTime ? 'Yes' : 'No'}
                </FieldData>
              </DetailField>
              <DetailField>
                <FieldTitle>Time counted</FieldTitle>
                <FieldData currentcolor={currentColor}>
                  {displayTimeFormat(record.secondsCounted)}
                </FieldData>
              </DetailField>
              <DetailField>
                <FieldTitle>Paused</FieldTitle>
                <FieldData currentcolor={currentColor}>
                  {record.noOfTimesPaused ? record.noOfTimesPaused : ''}
                  {record.noOfTimesPaused > 1
                    ? ' times'
                    : record.noOfTimesPaused === 1
                    ? ' time'
                    : 'none'}
                </FieldData>
              </DetailField>
              <DetailField>
                <FieldTitle>Time completed</FieldTitle>
                <FieldData currentcolor={currentColor}>
                  {record.endTime
                    ? new Date(record.endTime).toLocaleTimeString()
                    : 'none'}
                </FieldData>
              </DetailField>
            </MoreDetails>
          </>
        ))}
      </DetailsContainer>
    </Wrapper>
  )
}

export default Logs
