import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Switch = styled(motion.div)<{ isactive: string | undefined }>`
  width: 37px;
  height: 23px;
  background-color: transparent;
  opacity: ${({ isactive }) => (isactive ? 1 : 0.5)};
  border: 1px solid white;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: ${({ isactive }) => (isactive ? 'end' : 'start')};
  padding: 0px 3px;
`

const SwitchCircle = styled(motion.div)<{ isactive: string | undefined }>`
  width: ${({ isactive }) => (isactive ? '50%' : '37%')};
  height: ${({ isactive }) => (isactive ? '70%' : '50%')};
  margin-left: ${({ isactive }) => !isactive && '2px'};
  border: 1px solid white;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ToogleSwitchProps {
  switchState: boolean
  toogleFunction: () => void
}
function ToogleSwitch({ switchState, toogleFunction }: ToogleSwitchProps) {
  return (
    <Switch
      onClick={toogleFunction}
      isactive={switchState ? switchState + '' : undefined}>
      <SwitchCircle
        layout
        isactive={switchState ? switchState + '' : undefined}>
        {switchState && (
          <FontAwesomeIcon size="xs" icon={faCheck} color="black" />
        )}
      </SwitchCircle>
    </Switch>
  )
}

export default ToogleSwitch
