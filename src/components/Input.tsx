import { FC } from "react"
import { useTimerStore } from "../store/timerStore"

const Input: FC = () => {
  const [createTimer, timers] = useTimerStore(state => [state.createTimer, state.timers])

  return (
    <div className="relative z-30 p-5 m-3 border-2 rounded-full border-slate-400 opacity-60 hover:opacity-90 hover:bg-slate-200">
      {timers?.length < 5 && <button onClick={() => createTimer("eew")}>ok</button>}
    </div>
  )
}

export default Input