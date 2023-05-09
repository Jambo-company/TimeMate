import styled from 'styled-components'
import SettingHeading from './SettingHeading'
import { useState } from 'react'
import { accentColor } from '../globals'
import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { maxTime } from '../../atom'

const TimeSettingsWrapper = styled.div``

const MaxTimeSettings = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  transform-origin: top;
`

const IntervalSettings = styled(MaxTimeSettings)``

const SettingOption = styled(motion.div)`
  height: 20px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 15px;
  border-radius: 17px;
  cursor: pointer;
  transition: all 0.15s linear;
  &:hover {
    background-color: ${accentColor};
  }
`

const Selected = styled.span`
  font-size: 11px;
  font-weight: 200;
`

function TimeSettings() {
  const [maximumTime, setMaximumTime] = useRecoilState(maxTime)

  const [showMaxTimeSettings, setShowMaxTimeSettings] = useState(false)
  const toogleMaxTimeSettings = () => setShowMaxTimeSettings((prev) => !prev)
  const maxTimeArr = [
    { text: '10 mins', value: 600 },
    { text: '30 mins', value: 1800 },
    { text: '1 hour', value: 3600 },
    { text: '2 hours', value: 7200 },
    { text: '4 hours', value: 14400 },
    { text: '6 hours', value: 21600 },
    { text: '12 hours', value: 43200 },
    { text: '24 hours', value: 86400 },
  ]

  const [showIntervalSetttings, setShowIntervalSettings] = useState(false)
  const toogleIntervalSettings = () => setShowIntervalSettings((prev) => !prev)

  return (
    <TimeSettingsWrapper>
      <SettingHeading
        title="Set maximum time"
        settingOpen={showMaxTimeSettings}
        toogleSetings={toogleMaxTimeSettings}
      />
      <AnimatePresence>
        {showMaxTimeSettings && (
          <MaxTimeSettings
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1, transition: { duration: 0.3 } }}
            exit={{ scaleY: 0, transition: { duration: 0.15 } }}>
            {maxTimeArr.map((item, index) => (
              <SettingOption
                key={index}
                onClick={() => {
                  setMaximumTime(item.value)
                  console.log('Maximum time is now:', item.text)
                }}>
                {item.text}
                {item.value === maximumTime && <Selected>Selected</Selected>}
              </SettingOption>
            ))}
          </MaxTimeSettings>
        )}
      </AnimatePresence>

      {/* <SettingHeading
        title="Set interval per rotation"
        settingOpen={showIntervalSetttings}
        toogleSetings={toogleIntervalSettings}
      />
      <AnimatePresence>
        {showIntervalSetttings && (
          <IntervalSettings
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1, transition: { duration: 0.3 } }}
            exit={{ scaleY: 0, transition: { duration: 0.15 } }}>
            {[1, 5, 10, 15, 30].map((item, index) => (
              <SettingOption key={index}>
                {item} <Selected>Selected</Selected>
              </SettingOption>
            ))}
          </IntervalSettings>
        )}
      </AnimatePresence> */}

    </TimeSettingsWrapper>
  )
}

export default TimeSettings
