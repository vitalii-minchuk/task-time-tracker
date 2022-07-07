import { FC, Fragment, useState } from "react"
import AnimatedBalls from "./components/AnimatedBalls"
import Timer from "./components/Timer"

const App: FC = () => {
 
  return (
    <>
      <button className="absolute top-10 right-10">go</button>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16 overflow-hidden">
        
        <div className="relative w-full max-w-md z-20">
            <AnimatedBalls />
            <h1 className="text-2xl text-gray-600 text-center">TRACKER</h1>
            <button>ok</button>
              <div className="relative z-30 p-5 m-3 border-2 rounded-full border-slate-300 opacity-60 hover:opacity-90 hover:bg-slate-200 rounded-lg flex items-center justify-between space-x-8">
                <Timer />
              </div>
          </div>
      </div>
    </>
  )
}

export default App
