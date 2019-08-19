import { GlobalHotKeys } from 'react-hotkeys'

const KEY_MAP = {
  MOVE_UP: 'up',
  MOVE_DOWN: 'down'
}

type HotKeysProps = {
  handlers: Record<string, any>,
  children: React.ReactNode,
}

const ListenForHotKeys = (props: HotKeysProps) => {
  const { handlers, children } = props

  return (
    <GlobalHotKeys keyMap={KEY_MAP} handlers={handlers} allowChanges>
      {children}
    </GlobalHotKeys>
  )
}

export default ListenForHotKeys
