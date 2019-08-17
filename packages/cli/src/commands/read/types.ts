import { RootArgv } from '../../types'

export interface Argv extends RootArgv {
  ids: string[],
  format: string,
}
