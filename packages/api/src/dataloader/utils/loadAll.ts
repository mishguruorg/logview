import { Model } from '@mishguru/mysql-database'

import parseKeys from './parseKeys'

export interface Options {
  table: Model<any>,
  primaryKey: string,
  parseKeyAsNumber: boolean,
  where: Record<string, any>
}

const loadAll = <ID>(options: Options) => async (rawKeys: string[]) => {
  const { table, parseKeyAsNumber, primaryKey, where: customWhere } = options
  const { keys, attributes, ids } = parseKeys<ID>(rawKeys, primaryKey, {
    parseKeyAsNumber,
  })

  const where = { ...customWhere, [primaryKey]: { $in: ids } }

  const rows = await table.findAll({
    raw: true,
    attributes,
    where,
  })

  if (rows.length === 0) {
    return [...Array(keys.length)].fill([])
  }

  const rowMap = rows.reduce((obj, row) => {
    const id = row[primaryKey]
    if (obj[id] == null) {
      obj[id] = []
    }
    obj[id].push(row)
    return obj
  }, {})

  return keys.map((key) => {
    const row = rowMap[key.id]
    if (row == null) {
      return []
    }
    return row.map((entry: Record<string, any>) => entry[key.column])
  })
}

export default loadAll
