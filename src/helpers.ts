import { TimerType } from "./store/timerStore"

export type FormatDataType = {
  hoursFormat: string
  minutesFormat: string
  secondsFormat: string
}

export const calculateTimer = (time: number): FormatDataType => {
  const hours: number = Math.floor(time / 3600)
  const minutes: number = Math.floor((time - (hours * 3600)) / 60)
  const seconds: number = time - (hours * 3600) - (minutes * 60)

  const hoursFormat = hours < 10 ? `0${hours}` : hours.toString()
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes.toString()
  const secondsFormat = seconds < 10 ? `0${seconds}` : seconds.toString()

  return {hoursFormat, minutesFormat, secondsFormat}
}

export const getActualTimer = (start: number, pause: number | null): number => {
  let actualSeconds = 0

  if (pause) {
    actualSeconds = Math.round((pause - start) / 1000)
  } else {
    actualSeconds = Math.round((Date.now() - start) / 1000)
  }

  return actualSeconds
}

export const getOrderNumber = (arr: TimerType[]): number => {
  const array: Array<number> = []

  arr.forEach((item => {
    if (item.title.includes("No name tracker #")) {
      array.push(Number(item.title.slice(-1)))
    }
  }))

  for (let index = 1; index < array.length + 2; index++) {
    if (!array.includes(index)) return index
  }

  return 1
}