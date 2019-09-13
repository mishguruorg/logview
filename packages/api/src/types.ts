import { DispatchFn } from '@mishguru/turbine'

import { Db } from './createDb'

export interface Context {
  authorized: boolean,
  db: Db,
  dispatch: DispatchFn,
}
