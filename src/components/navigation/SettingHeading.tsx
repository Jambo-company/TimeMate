import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { accentColor } from '../globals'

const Header = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 270px;
  margin-bottom: 7px;
  margin-left: -15px;
  padding: 7px 15px;
  border-radius: 15px;
  transition: background-color 0.25s linear;
  cursor: pointer;
  &:hover {
    background-color: ${accentColor};
  }
`
const Heading = styled.h3`
  font-size: 17px;
`

interface SettingHeadingProps {
  title: string
  settingOpen: boolean
  toogleSetings: () => void
}
function SettingHeading({
  title,
  settingOpen,
  toogleSetings,
}: SettingHeadingProps) {
  return (
    <Header onClick={toogleSetings} transition={{ duration: 0.25 }} layout>
      <Heading>{title}</Heading>
      <FontAwesomeIcon icon={settingOpen ? faCaretUp : faCaretDown} size="sm" />
    </Header>
  )
}

export default SettingHeading
