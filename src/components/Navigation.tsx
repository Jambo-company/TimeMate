import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faDatabase,
  faDisplay,
  faAngleLeft,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import TimeSettings from './navigation/TimeSettings'
import { accentColor } from './globals'
import DisplaySettings from './navigation/DisplaySettings'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'

const LeftNav = styled(motion.nav)`
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #2c3333;
  width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 9;
`

const LeftNavSettings = styled(motion.aside)`
  position: absolute;
  left: 80px;
  padding: 0 25px;
  background-color: #2c3333;
  border-left: solid 0.5px rgba(200, 200, 200, 0.45);
  border-top-right-radius: 25px;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  transform-origin: left;
  z-index: 10;
`

const NavOptionCarrier = styled.div`
  margin-top: 45px;
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
  toggleShowing: () => void
  showTime: boolean
}
function Navigation({ showing, toggleShowing, showTime }: NavigationProps) {
  const [moreNavOptions, setMoreNavOptions] = useState(false)

  const [isTimeOption, setIsTimeOption] = useState(false)
  const [isRecordsOption, setIsRecordsOption] = useState(false)
  const [isDisplayOption, setIsDisplayOption] = useState(false)
  const onLogoutClick = () => auth.signOut()

  const navItemsArray = [
    {
      icon: faDatabase,
      text: 'Records',
      isOptionSelected: isRecordsOption,
      setSelectedNavOption: setIsRecordsOption,
      linkPath: '/dashboard',
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
  ]

  return (
    <AnimatePresence initial={false}>
      {showing ? (
        <LeftNav
          layoutId="hide"
          transition={{ delay: 0.3, delayChildren: 0, type: 'tween' }}
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
                <Link to={option.linkPath ? option.linkPath : ''}>
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
                </Link>

                <Navtext>{option.text}</Navtext>
              </NavOption>
            ))}
            <NavOption>
              <FontAwesomeIcon
                icon={faSignOut}
                color="white"
                onClick={onLogoutClick}
              />
              <Navtext>Sign Out</Navtext>
            </NavOption>
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
                {isTimeOption && (
                  <TimeSettings
                    switchTime={toggleShowing}
                    showDigitalTime={showTime}
                  />
                )}
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
