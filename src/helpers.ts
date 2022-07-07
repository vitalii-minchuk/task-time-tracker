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