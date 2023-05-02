import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const maxTime = atom({
  key: 'MaximumTime', // unique ID (with respect to other atoms/selectors)
  default: 7200, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
})

export const selectedTime = atom({
  key: 'SelectedTime',
  default: 0,
  effects_UNSTABLE: [persistAtom],
})

export const currentTimeValue = atom({
  key: 'CurrentTimeValue',
  default: 0,
  effects_UNSTABLE: [persistAtom],
})

export enum EnumColors {
  'RED' = '#EA2027',
  'DARK_PINK' = '#f53b57',
  'YELLOW' = '#FFC312',
  'GREEN' = '#009432',
  'BLUE' = 'royalblue',
  'PURPLE' = '#4834d4',
  'WHITE' = 'whitesmoke',
  'BLACK' = 'black',
}

export const displayFillColor = atom<EnumColors>({
  key: 'DisplayColor',
  default: EnumColors.YELLOW,
  effects_UNSTABLE: [persistAtom],
})
