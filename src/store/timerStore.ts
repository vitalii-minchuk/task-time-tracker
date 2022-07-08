import create, { State, StateCreator} from "zustand"

export type TimerType = {
  id: number
  title: string
  isTicking: boolean
  createdAt: number
  pausedAt: number | null
  resumedAt: number | null
  correctedCreatedAt:  number
}

type TimerStoreType = {
  timers: TimerType[]
  createTimer: (title: string) => void
  stopTimer: (id: number, when: number, tick: boolean) => void
  runTimer: (id: number, when: number, tick: boolean) => void
  correctTimer: (id: number, correction: number) => void
  deleteTimer: (id: number) => void
}

function isTimersStore(object: any): object is TimerStoreType {
  return "timers" in object
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>):
  //@ts-ignore
  StateCreator<T> => (set, get, api, ) => config((nextState, ...args) => {
  if (isTimersStore(nextState)) {
    localStorage.setItem("timers", JSON.stringify(nextState.timers))
  }
  set(nextState, ...args)
  
}, get, api)

const getCurrentState = () => {
  try {
    const currentState = JSON.parse(localStorage.getItem("timers") || "[]") as TimerType[]
    return currentState
  } catch (error) {
    console.log(error)
  }
  return []
}

export const useTimerStore = create<TimerStoreType>(localStorageUpdate((set, get) => ({
  timers: getCurrentState(),
  createTimer: (title) => {
    const { timers } = get()
    const newTimer = {
      id: Date.now(),
      time: 0,
      title,
      isTicking: true,
      createdAt: Date.now(),
      pausedAt: null,
      resumedAt: null,
      correctedCreatedAt:  Date.now()
    }
    set({timers: [newTimer, ...timers]})
  },
  runTimer: (id, when, running) => {
    const { timers } = get()
    set({
      timers: timers.map(timer => ({
        ...timer,
        resumedAt: timer.id === id ? when : timer.pausedAt,
        isTicking: timer.id === id ? running : timer.isTicking
      }))
    })
  },
  stopTimer: (id, when, running) => {
    const { timers } = get()
    set({
      timers: timers.map(timer => ({
        ...timer,
        pausedAt: timer.id === id ? when : timer.pausedAt,
        isTicking: timer.id === id ? running : timer.isTicking,
      }))
    })
  },
  deleteTimer: (id) => {
    const { timers } = get()
    set({
      timers: timers.filter(timer => timer.id !== id)
    }
  )},
  correctTimer: (id, correction) => {
    const { timers } = get()
    set({
      timers: timers.map(timer => ({
        ...timer,
        correctedCreatedAt: timer.id === id
          ? timer.correctedCreatedAt + correction
          : timer.correctedCreatedAt,
        resumedAt: timer.id === id ? null : timer.resumedAt,
        pausedAt: timer.id === id ? null : timer.pausedAt
      }))
    })
  },
})))

