import { useEventBus } from '@vueuse/core'

type ModalHook = {
  open: (payload: ModalPayload) => void
  close: (payload?: ModalPayload) => void
  listen: (fn: Function) => void
  off: () => void
}

export type ModalPayload = {
  type?: 'default' | 'warn'
  title?: string
  content?: string
  isOpen?: boolean
  okHandler?: () => void
  okText?: string
}

export default function useModal(): ModalHook {
  const bus = useEventBus('modal')
  const EVENT_NAME = 'modal:toggle'

  function open(payload: ModalPayload) {
    bus.emit(EVENT_NAME, { type: 'default', ...payload, isOpen: true })
  }

  function close(payload: ModalPayload = {} as ModalPayload) {
    bus.emit(EVENT_NAME, { type: 'default', ...payload, isOpen: false })
  }

  function listen(fn: Function) {
    bus.on((_, payload: ModalPayload) => {
      fn(payload)
    })
  }

  function off() {
    bus.reset()
  }

  return {
    open,
    close,
    listen,
    off
  }
}
