import { Dispatch, FC, KeyboardEvent, SetStateAction, useEffect, useState } from "react"
import { getOrderNumber } from "../helpers"
import { useTimerStore } from "../store/timerStore"

type InputProps = {
  setMessage: Dispatch<SetStateAction<string | null>>
}


const Input: FC<InputProps> = ({ setMessage }) => {
  const [orderNumber, setOrderNumber] = useState(0)
  const [value, setValue] = useState("")
  const [createTimer, timers] = useTimerStore(state => [state.createTimer, state.timers])
  const newTitle = value.trim() ? value.trim() : `No name tracker #${orderNumber}`

  useEffect(() => {
    setOrderNumber(getOrderNumber(timers))
  }, [timers])

  const inputHandler = (): void => {
    createTimer(newTitle)
    setValue("")
    setMessage(`Tracker "${newTitle}"-*-has been added`)
  }

  const keyEnterHandler = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      createTimer(newTitle)
      setValue("")
      setMessage(`Tracker ${newTitle}-*-has been added`)
    }
  }

  return (
    <div className="relative z-30 h-9 sm:h-12 p-1 m-3 mb-5 flex justify-between items-center border-2 rounded-full border-slate-400 opacity-90 bg-slate-300">
      <input
        className="opacity-90 bg-slate-300 w-3/5 outline-none pl-2 text-xs sm:text-base"
        placeholder="Enter tracker name"
        value={value}
        type="text"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => keyEnterHandler(e)}
      />
      {timers?.length < 5 && value?.length < 30 && <button onClick={inputHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:opacity-60 sm:h-10 sm:w-10" viewBox="0 0 20 20" fill="green">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </button>}
      {value?.length > 29 && <strong className=" pr-2 text-xs sm:text-base">30 symbols max</strong>}
    </div>
  )
}

export default Input