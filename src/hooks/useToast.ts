import { useEventBus } from '@vueuse/core'

type ToastHook = {
  dispatch: (payload: ToastPayloadDispatch) => void
  listen: (fn: Function) => void
  off: () => void
}

export type ToastPayload = {
  id: number
  type?: 'default' | 'success'
  message: string
}

export type ToastPayloadDispatch = Omit<ToastPayload, 'id'>

export default function useToast(): ToastHook {
  const bus = useEventBus('toast')
  const EVENT_NAME = 'toast:dispatch'

  function dispatch(payload: ToastPayloadDispatch) {
    bus.emit(EVENT_NAME, { id: Date.now(), ...payload })
  }

  function listen(fn: Function) {
    bus.on((_, payload: ToastPayload) => {
      fn(payload)
    })
  }

  function off() {
    bus.reset()
  }

  return {
    dispatch,
    listen,
    off
  }
}
