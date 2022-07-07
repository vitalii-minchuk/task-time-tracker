import { FC, useEffect, useState } from "react"
import { calculateTimer, FormatDataType } from "../helpers"

export type TimerType = {
  id: number
  time: number
  title: string
  isTicking: boolean
  createdAt: number
  pausedAt: number | null
  resumedAt: number | null
  correctedCreatedAt:  number
}

type TimerProps = {
}

const Timer: FC<TimerProps> = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const [timerArray, setTimerArray] = useState<FormatDataType>({} as FormatDataType)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const timeData = calculateTimer(timeInSeconds)
    setTimerArray(timeData)

  }, [timeInSeconds])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if(isPlaying) {
      interval = setInterval(() => {
        setTimeInSeconds(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    
    return () => clearInterval(interval)
    
  }, [isPlaying])

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleStop = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    
  }

  return (
    <div className="flex transition-all">
      <p>{timerArray.hoursFormat}</p>
      <span>:</span>
      <p>{timerArray.minutesFormat}</p>
      <span>:</span>
      <p>{timerArray.secondsFormat}</p>
      {isPlaying ? (
        <button onClick={handleStop}>stop</button>
      ) : (
        <button onClick={(handlePlay)}>play</button>
      )}
      <button onClick={handleReset}>reset</button>
    </div>
  )
}

export default Timer