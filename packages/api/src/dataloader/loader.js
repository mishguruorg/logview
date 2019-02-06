import meta from '@mishguru/mishmeta'

import { parseKey } from './key'

const getAttributeSetFromArray = (key, array) => {
  const set = new Set()
  for (const item of array) {
    set.add(item[key])
  }
  return set
}

const getColumns = (keys, primary) => {
  const set = getAttributeSetFromArray('column', keys)
  set.add(primary)
  return [...set]
}

const getIds = (keys) => {
  const set = getAttributeSetFromArray('id', keys)
  return [...set]
}

const parseKeys = (keys, primary, options) => {
  const { parseInt } = options
  keys = keys.map((key) => parseKey(key, { parseInt }))
  const columns = getColumns(keys, primary)
  const ids = getIds(keys)
  return {
    keys,
    columns,
    ids
  }
}

const createLoader = (table, options = {}) => async (rawKeys) => {
  const { parseInt = true, primary = 'id' } = options

  const { keys, columns, ids } = parseKeys(rawKeys, primary, { parseInt })

  const where = {
    [primary]: {
      $in: ids
    }
  }

  const rows = await meta[table].findAll({
    raw: true,
    attributes: columns,
    where
  })

  if (rows.length === 0) {
    return [...Array(rawKeys.length)].fill(null)
  }

  const rowMap = rows.reduce((obj, row) => {
    obj[row[primary]] = row
    return obj
  }, {})

  return keys.map((key) => {
    const row = rowMap[key.id]
    if (row == null) {
      return null
    }
    return row[key.column]
  })
}

export default createLoader
