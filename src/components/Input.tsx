import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
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
console.log(orderNumber)
  useEffect(() => {
    setOrderNumber(getOrderNumber(timers))
  }, [timers])

  const inputHandler = (): void => {
    createTimer(newTitle)
    setValue("")
    setMessage("Tracker has been added")
  }

  return (
    <div className="relative z-30 p-5 m-3 border-2 rounded-full border-slate-400 opacity-90 bg-slate-200">
      <input
        className=" opacity-90 bg-slate-200 outline-none"
        placeholder="Enter tracker name"
        value={value}
        type="text"
        onChange={(e) => setValue(e.target.value)}
      />
      {timers?.length < 5 && value?.length < 30 && <button onClick={inputHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="green">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </button>}
      {value?.length > 29 && <strong>30 symbols max</strong>}
    </div>
  )
}

export default Input