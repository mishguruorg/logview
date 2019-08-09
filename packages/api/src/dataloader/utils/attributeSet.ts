import { Key } from './key'

const getColumns = <ID>(keys: Key<ID>[], primaryKey: string): string[] => {
  const set = new Set<string>()
  for (const key of keys) {
    set.add(key.column)
  }
  set.add(primaryKey)
  return [...set]
}

const getIds = <ID>(keys: Key<ID>[]): ID[] => {
  const set = new Set<ID>()
  for (const key of keys) {
    set.add(key.id)
  }
  return [...set]
}

export { getColumns, getIds }
