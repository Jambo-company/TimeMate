import styled from 'styled-components'

const Container = styled.div`
  width: 425px;
  height: 425px;
  background-color: transparent;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  opacity: 0.9;
  @media (max-width: 461px) {
    width: 270px;
    height: 270px;
  }
  @media (max-width: 355px) {
    width: 200px;
  }
`

const Number = styled.div`
  --rotation: 0;
  position: absolute;
  width: 100%;
  height: 103%;
  text-align: center;
  transform: rotate(var(--rotation));
  color: white;
`
const Number1 = styled(Number)`
  --rotation: 30deg;
`
const Number2 = styled(Number)`
  --rotation: 60deg;
`
const Number3 = styled(Number)`
  --rotation: 90deg;
`
const Number4 = styled(Number)`
  --rotation: 120deg;
`
const Number5 = styled(Number)`
  --rotation: 150deg;
`
const Number6 = styled(Number)`
  --rotation: 180deg;
`
const Number7 = styled(Number)`
  --rotation: 210deg;
`
const Number8 = styled(Number)`
  --rotation: 240deg;
`
const Number9 = styled(Number)`
  --rotation: 270deg;
`
const Number10 = styled(Number)`
  --rotation: 300deg;
`
const Number11 = styled(Number)`
  --rotation: 330deg;
`
const Number12 = styled(Number)``

const Clockunits = styled.div`
  width: 90%;
  height: 85%;
  position: relative;
  padding: 2rem;
  border-radius: 50%;
  margin: 50px auto;
`
const OuterClockFace = styled.div`
  position: relative;
  background: transparent;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  ::after {
    transform: rotate(90deg);
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: #fff;
    z-index: 0;
    left: 49%;
  }
  ::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: #fff;
    z-index: 0;
    left: 49%;
  }
`

const Mask = styled.div`
  position: absolute;
  margin: auto;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 90%;
  width: 90%;
  border-radius: 50%;
  background-color: rgba(35, 35, 35, 1);
`

const Marking = styled.div`
  content: '';
  position: absolute;
  width: 2px;
  height: 100%;
  background: #fff;
  z-index: 0;
  left: 49%;
`
const Marking1 = styled(Marking)`
  transform: rotate(30deg);
`
const Marking2 = styled(Marking)`
  transform: rotate(60deg);
`
const Marking3 = styled(Marking)`
  transform: rotate(90deg);
`
const Marking4 = styled(Marking)`
  transform: rotate(120deg);
`
const Marking5 = styled(Marking)`
  transform: rotate(150deg);
`

function ClockUnits({ children }: any) {
  return (
    <Container>
      <Number1>55</Number1>
      <Number2>50</Number2>
      <Number3>45</Number3>
      <Number4>40</Number4>
      <Number5>35</Number5>
      <Number6>30</Number6>
      <Number7>25</Number7>
      <Number8>20</Number8>
      <Number9>15</Number9>
      <Number10>10</Number10>
      <Number11>5</Number11>
      <Number12>0</Number12>

      <Clockunits>
        <OuterClockFace>
          <Marking1 />
          <Marking2 />
          <Marking3 />
          <Marking4 />
          <Marking5 />
          <Mask />
          {children}
        </OuterClockFace>
      </Clockunits>
    </Container>
  )
}

export default ClockUnits
