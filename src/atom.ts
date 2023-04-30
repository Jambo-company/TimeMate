import { atom } from 'recoil'

export const maxTime = atom({
  key: 'MaximumTime', // unique ID (with respect to other atoms/selectors)
  default: 3600, // default value (aka initial value)
})

export const selectedTime = atom({
  key: 'SelectedTime',
  default: 0,
})

export const currentTimeValue = atom({
  key: 'CurrentTimeValue',
  default: 0,
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
})
