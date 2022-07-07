import { FC, useEffect, useState } from "react"
import { calculateTimer, FormatDataType, getActualTimer } from "../helpers"
import { TimerType, useTimerStore } from "../store/timerStore"

type TimerProps = {
  timer: TimerType
}

const Timer: FC<TimerProps> = ({ timer }) => {
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const [timerArray, setTimerArray] = useState<FormatDataType>({} as FormatDataType)
  const [isPlaying, setIsPlaying] = useState(timer.isTicking)
  const [
    runTimer,
    stopTimer,
    deleteTimer,
    correctTimer
  ] = useTimerStore(state => [
    state.runTimer,
    state.stopTimer,
    state.deleteTimer,
    state.correctTimer
  ])

  useEffect(() => {
    const actualSeconds = getActualTimer(timer.correctedCreatedAt, timer.pausedAt)
    setTimeInSeconds(actualSeconds)
// console.log(timer.correctedCreatedAt, timer.pausedAt)
// console.log(actualSeconds, correction)
  }, [timer.correctedCreatedAt, timer.pausedAt])

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
    runTimer(timer.id, Date.now(), true)
    setIsPlaying(true)

    if(timer.pausedAt) {
      const correction: number =  Date.now() - timer.pausedAt
      correctTimer(timer.id, correction)
    }
  }

  const handleStop = () => {
    stopTimer(timer.id, Date.now(), false)
    setIsPlaying(false)
  }

  const handleReset = () => deleteTimer(timer.id)

  return (
    <div className="relative z-30 p-5 m-3 border-2 rounded-full border-slate-400 opacity-60 hover:opacity-90 hover:bg-slate-200 flex items-center justify-between space-x-8 animate-appear">
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
    </div>
  )
}

export default Timer