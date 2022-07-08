import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { calculateTimer, FormatDataType, getActualTimer } from "../helpers"
import { TimerType, useTimerStore } from "../store/timerStore"

type TimerProps = {
  timer: TimerType
  setMessage: Dispatch<SetStateAction<string | null>>
}

const Timer: FC<TimerProps> = ({ timer, setMessage }) => {
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

  const handlePlay = (): void => {
    runTimer(timer.id, Date.now(), true)
    setIsPlaying(true)

    if(timer.pausedAt) {
      const correction: number =  Date.now() - timer.pausedAt
      correctTimer(timer.id, correction)
    }
  }

  const handleStop = (): void => {
    stopTimer(timer.id, Date.now(), false)
    setIsPlaying(false)
  }

  const handleReset = (): void => {
    deleteTimer(timer.id)
    setMessage("Tracker has been deleted")
  }

  return (
    <div className="animate-appear relative z-30 p-5 m-3 border-2 rounded-full border-slate-400 opacity-60 hover:opacity-90 hover:bg-slate-200 flex items-center justify-between space-x-8">
      <p className={isPlaying ? "text-green-500" : "text-gray-500"}>{timer.title}</p>
    <div className="flex transition-all">
      <p>{timerArray.hoursFormat}</p>
      <span>:</span>
      <p>{timerArray.minutesFormat}</p>
      <span>:</span>
      <p>{timerArray.secondsFormat}</p>
      {isPlaying ? (
        <button onClick={handleStop}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      ) : (
        <button onClick={(handlePlay)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
      <button onClick={handleReset}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke="red" />
        </svg>
      </button>
    </div>
    </div>
  )
}

export default Timer