import { Db } from './createDb'

export interface Context {
  authorized: boolean,
  db: Db,
}
