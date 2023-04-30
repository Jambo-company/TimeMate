import styled from 'styled-components'
import SettingHeading from './SettingHeading'
import { useState } from 'react'
import { accentColor } from '../globals'
import { AnimatePresence, motion } from 'framer-motion'

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
  padding: 7px 15px;
  border-radius: 17px;
  cursor: pointer;
  transition: all 0.15s linear;
  &:hover {
    background-color: ${accentColor};
  }
`

function TimeSettings() {
  const [showMaxTimeSettings, setShowMaxTimeSettings] = useState(false)
  const toogleMaxTimeSettings = () => setShowMaxTimeSettings((prev) => !prev)

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
            {[10, 30, 1, 2, 4, 6, 12, 24].map((item) => (
              <SettingOption key={item}>{item}</SettingOption>
            ))}
          </MaxTimeSettings>
        )}
      </AnimatePresence>

      <SettingHeading
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
            {[1, 5, 10, 15, 30].map((item) => (
              <SettingOption key={item}>{item}</SettingOption>
            ))}
          </IntervalSettings>
        )}
      </AnimatePresence>
    </TimeSettingsWrapper>
  )
}

export default TimeSettings
