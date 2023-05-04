import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const maxTime = atom({
  key: 'MaximumTime', // unique ID (with respect to other atoms/selectors)
  default: 3600, // default value (aka initial value)
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
  'RED' = 'rgba(234,32,39, 0.7)',
  'DARK_PINK' = 'rgba(245,59,87, 0.7)',
  'YELLOW' = 'rgba(255,195,18, 0.7)',
  'GREEN' = 'rgba(0,148,50, 0.7)',
  'BLUE' = 'rgba(65,105,225, 0.7)',
  'PURPLE' = 'rgba(72,52,212, 0.7)',
  'WHITE' = 'rgba(245,245,245, 0.7)',
  'BLACK' = 'rgba(0,0,0, 0.7)',
}

export const displayFillColor = atom<EnumColors>({
  key: 'DisplayColor',
  default: EnumColors.YELLOW,
  effects_UNSTABLE: [persistAtom],
})
