import { configure, HotKeys } from 'react-hotkeys'

const KEY_MAP = {
  MOVE_UP: 'up',
  MOVE_DOWN: 'down'
}

type HotKeysProps = {
  handlers: Record<string, any>,
  children: React.ReactNode,
}

configure({
  ignoreRepeatedEventsWhenKeyHeldDown: false
})

const ListenForHotKeys = (props: HotKeysProps) => {
  const { handlers, children } = props

  return (
    <HotKeys
      keyMap={KEY_MAP}
      handlers={handlers}
      allowChanges
    >
      {children}
    </HotKeys>
  )
}

export default ListenForHotKeys
