import { RootArgv } from '../../types'

export interface Argv extends RootArgv {
  follow: boolean,
  lines: number,
  format: string,
  user: string[],
  sentFrom: string[],
  type: string[],
  payload: string,
  before: string,
  after: string,
  sentBefore: string,
  sentAfter: string,
}
