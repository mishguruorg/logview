import Dataloader from 'dataloader'

import { key } from './utils/key'
import loadAll, { Options } from './utils/loadAll'

export interface Loader<ID> {
  load: <T>(id: ID, attribute: string) => Promise<T>,
  loadAll: <T>(id: ID, attribute: string) => Promise<T[]>,
}

const firstValueOrNull = <T>(array: T[]): T => {
  if (array.length === 0) {
    return null
  }
  return array[0]
}

const createLoaderForTable = <ID>(options: Options): Loader<ID> => {
  const dataloader = new Dataloader(loadAll<ID>(options))

  const loader: Loader<ID> = {
    load: async <T>(id: ID, attribute: string) => {
      const values = (await dataloader.load(key(id, attribute))) as T[]
      return firstValueOrNull<T>(values)
    },
    loadAll: async <T>(id: ID, attribute: string) => {
      return (await dataloader.load(key(id, attribute))) as T[]
    },
  }

  return loader
}

export { createLoaderForTable }
