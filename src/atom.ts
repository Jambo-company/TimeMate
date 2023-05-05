import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

/* 
export const TimerAtom = atom({
  key: 'TimerInfo', // unique ID (with respect to other atoms/selectors)
  default: {
    maxTime: 3600,
    rotationInterval: 1,
    selectedTime: 0,
    currentTime: 0,
  }, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
})
 */

export const maxTime = atom({
  key: 'MaximumTime', // unique ID (with respect to other atoms/selectors)
  default: 3600, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
})

export const rotationInterval = atom({
  key: 'Rotation Interval',
  default: 1,
  effects_UNSTABLE: [persistAtom],
})

export const selectedTime = atom<number>({
  key: 'SelectedTime',
  default: 0,
  effects_UNSTABLE: [persistAtom],
})

export const currentTimeValue = atom<number>({
  key: 'CurrentTimeValue',
  default: 0,
  effects_UNSTABLE: [persistAtom],
})

export enum EnumColors {
  'RED' = 'rgba(234,32,39, 0.8)',
  'DARK_PINK' = 'rgba(245,59,87, 0.8)',
  'YELLOW' = 'rgba(241, 196, 15,0.8)',
  'GREEN' = 'rgba(0,148,50, 0.8)',
  'BLUE' = 'rgba(65,105,225, 0.8)',
  'PURPLE' = 'rgba(72,52,212, 0.8)',
  'WHITE' = 'rgba(245,245,245, 0.8)',
  'BLACK' = 'rgba(0,0,0, 0.8)',
}

export const displayFillColor = atom<EnumColors>({
  key: 'DisplayColor',
  default: EnumColors.YELLOW,
  effects_UNSTABLE: [persistAtom],
})
