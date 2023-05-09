import styled from 'styled-components'
import { EnumColors, displayFillColor } from '../../atom'
import SettingHeading from './SettingHeading'
import { AnimatePresence, motion } from 'framer-motion'
import { accentColor } from '../globals'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

const DisplaySettingsWrapper = styled.div``

const ColorSettings = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  transform-origin: top;
`

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
const Color = styled.div<{ color: string }>`
  height: 77%;
  width: 7%;
  border-radius: 3.5px;
  background-color: ${({ color }) => color};
`
const Selected = styled.span`
  font-size: 11px;
  font-weight: 200;
`

function DisplaySettings() {
  const [showColorSettings, setShowColorSettings] = useState(false)
  const toogleColorSettings = () => setShowColorSettings((prev) => !prev)

  const [currentColor, setCurrentColor] = useRecoilState(displayFillColor)

  return (
    <DisplaySettingsWrapper>
      <SettingHeading
        title="Colors"
        settingOpen={showColorSettings}
        toogleSetings={toogleColorSettings}
      />
      <AnimatePresence>
        {showColorSettings && (
          <ColorSettings
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1, transition: { duration: 0.3 } }}
            exit={{ scaleY: 0, transition: { duration: 0.15 } }}>
            {Object.values(EnumColors).map((item, index) => (
              <SettingOption key={index} onClick={() => setCurrentColor(item)}>
                <Color color={item} />
                {currentColor === item && <Selected>Selected</Selected>}
              </SettingOption>
            ))}
          </ColorSettings>
        )}
      </AnimatePresence>
    </DisplaySettingsWrapper>
  )
}

export default DisplaySettings
