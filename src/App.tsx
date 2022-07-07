import { FC, Fragment } from "react"
import AnimatedBalls from "./components/AnimatedBalls"
import Input from "./components/Input"
import Timer from "./components/Timer"
import { useTimerStore } from "./store/timerStore"

const App: FC = () => {
  const timers = useTimerStore(state => state.timers)
 
  return (
    <Fragment>
      <button className="absolute top-10 right-10">go</button>
      <div className="bg-gray-200 min-h-screen flex items-center justify-center px-16 overflow-hidden">
        
        <div className="relative w-full max-w-md z-20">
            <AnimatedBalls />
            <h1 className="text-2xl text-gray-700 text-center">TRACKER</h1>
              <Input />
              {timers?.map(timer => (
                <Timer key={timer.id} timer={timer} />
              ))}
          </div>
      </div>
    </Fragment>
  )
}

export default App
