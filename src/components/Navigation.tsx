import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faDatabase,
  faDisplay,
  faLanguage,
  faBell,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import TimeSettings from './nav-components/TimeSettings'
import { accentColor } from './globals'
import DisplaySettings from './nav-components/DisplaySettings'

const LeftNav = styled(motion.nav)`
  position: fixed;
  background-color: rgba(50, 50, 65, 0.5);
  width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const LeftNavSettings = styled(motion.aside)`
  position: absolute;
  left: 80px;
  padding: 0 25px;
  background-color: rgba(50, 50, 65, 0.5);
  border-left: solid 0.5px rgba(200, 200, 200, 0.45);
  border-top-right-radius: 25px;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  transform-origin: left;
`

const NavOptionCarrier = styled.div`
  margin-top: 65px;
  width: 75px;
  height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const NavOption = styled.div`
  margin-bottom: 30px;
  width: 75px;
  height: 50px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Navtext = styled.span`
  color: gainsboro;
  margin-top: 5px;
  font-size: 14px;
  font-weight: 500;
`

interface NavigationProps {
  showing: boolean
  setShowing: React.Dispatch<React.SetStateAction<boolean>>
}
function Navigation({ showing, setShowing }: NavigationProps) {
  const [moreNavOptions, setMoreNavOptions] = useState(false)

  const [isTimeOption, setIsTimeOption] = useState(false)
  const [isRecordsOption, setIsRecordsOption] = useState(false)
  const [isDisplayOption, setIsDisplayOption] = useState(false)
  const [isLanguageOption, setIsLanguageOption] = useState(false)
  const [isNotificationOption, setIsNotificationOption] = useState(false)

  const navItemsArray = [
    {
      icon: faDatabase,
      text: 'Records',
      isOptionSelected: isRecordsOption,
      setSelectedNavOption: setIsRecordsOption,
    },
    {
      icon: faClock,
      text: 'Time',
      isOptionSelected: isTimeOption,
      setSelectedNavOption: setIsTimeOption,
    },
    {
      icon: faDisplay,
      text: 'Display',
      isOptionSelected: isDisplayOption,
      setSelectedNavOption: setIsDisplayOption,
    },
    {
      icon: faLanguage,
      text: 'Language',
      isOptionSelected: isLanguageOption,
      setSelectedNavOption: setIsLanguageOption,
    },
    {
      icon: faBell,
      text: 'Notification',
      isOptionSelected: isNotificationOption,
      setSelectedNavOption: setIsNotificationOption,
    },
  ]

  return (
    <AnimatePresence initial={false}>
      {showing ? (
        <LeftNav
          layoutId="hide"
          transition={{ delay: 0.3, delayChildren: 0 }}
          initial={{ translateX: -100 }}
          animate={{ translateX: 0 }}
          exit={{ translateX: -100 }}
          layout>
          <NavOptionCarrier>
            {navItemsArray.map((option, index) => (
              <NavOption
                key={index}
                onClick={() => {
                  setMoreNavOptions(true)
                  navItemsArray.forEach((otherOptions) => {
                    otherOptions.setSelectedNavOption(false)
                  })
                  option.setSelectedNavOption(true)
                }}>
                <FontAwesomeIcon
                  style={{
                    backgroundColor: option.isOptionSelected
                      ? accentColor
                      : 'transparent',
                    padding: '5px 15px',
                    transition: 'all .3s ease-out',
                    borderRadius: 35,
                  }}
                  icon={option.icon}
                  color="white"
                />
                <Navtext>{option.text}</Navtext>
              </NavOption>
            ))}
          </NavOptionCarrier>

          <AnimatePresence>
            {moreNavOptions && (
              <LeftNavSettings
                transition={{ delay: 0.3 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}>
                <FontAwesomeIcon
                  onClick={() => {
                    navItemsArray.forEach((option) =>
                      option.setSelectedNavOption(false)
                    )
                    setMoreNavOptions(false)
                  }}
                  icon={faAngleLeft}
                  style={{ margin: '17px 0px', cursor: 'pointer' }}
                />
                {isTimeOption && <TimeSettings />}
                {isDisplayOption && <DisplaySettings />}
              </LeftNavSettings>
            )}
          </AnimatePresence>
        </LeftNav>
      ) : null}
    </AnimatePresence>
  )
}

export default Navigation
