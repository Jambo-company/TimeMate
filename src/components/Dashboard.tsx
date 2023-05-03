import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const AnchorHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  position: fixed;
  height: 100px;
  bottom: 0;
  left: 0;
  right: 0;
`

const HomeAnchor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c4991a;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  cursor: pointer;
`

const DashBoardContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50vh;
  background-color: blue;
`
const Logs = styled(motion.div)`
  width: 100%;
  background-color: #c4991a;
  height: 50vh;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 0px 50px;
`
const LogsData = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100px;
`
const LogsDataTitle = styled(motion.span)`
  font-size: 70px;
  font-weight: 600;
`
const LogsDataSubtitle = styled(motion.span)`
  font-size: 20px;
  font-weight: 500;
`

const Overview = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #306630;
  padding: 0px 50px;

  height: 50vh;
  border-radius: 15px;
`

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AnimatePresence>
      <DashBoardContainer>
        <Logs layout onClick={() => setIsOpen(!isOpen)}>
          <LogsData>
            <LogsDataTitle>Overview</LogsDataTitle>
            <LogsDataSubtitle>
              Gather your time records at a glace
            </LogsDataSubtitle>
          </LogsData>
        </Logs>
        {isOpen ? (
          <FontAwesomeIcon icon={faBars} color="white" size="3x" />
        ) : (
          <Overview >
            <LogsData>
              <LogsDataTitle>Logs</LogsDataTitle>
              <LogsDataSubtitle>
                Watch your records as a timeline
              </LogsDataSubtitle>
            </LogsData>
          </Overview>
        )}
      </DashBoardContainer>
      <AnchorHolder>
        <Link to="/">
          <HomeAnchor>
            <FontAwesomeIcon icon={faClock} color="white" size="3x" />
          </HomeAnchor>
        </Link>
      </AnchorHolder>
    </AnimatePresence>
  )
}
export default Dashboard
