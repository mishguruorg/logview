import meta from '@mishguru/mishmeta'

type ParsedKey = {
  id: number | string
  column: string
}

type ParseKeyOptions = {
  parseInt?: boolean
}

type CreateLoaderOptions = {
  parseInt?: boolean
  primary?: string
}

const key = (id: number | string, column: string) => {
  return `${id}:${column}`
}

const parseKey = (key: string, options: ParseKeyOptions = {}): ParsedKey => {
  const [idString, column] = key.split(':')

  // by default we parse keys as integers, but some keys need to be preserved
  // as strings. If you set `options.parseInt = false` then the conversion is
  // skipped.
  const id = options.parseInt === false ? idString : parseInt(idString, 10)

  return { id, column }
}

const getColumns = (parsedKeys: ParsedKey[], primary: string) => {
  const set = new Set()
  for (const key of parsedKeys) {
    set.add(key.column)
  }
  set.add(primary)
  return [...set]
}

const getIds = (parsedKeys: ParsedKey[]) => {
  const set = new Set()
  for (const key of parsedKeys) {
    set.add(key.id)
  }
  return [...set]
}

const parseKeys = (
  keys: string[],
  primary: string,
  options: ParseKeyOptions
) => {
  const { parseInt } = options
  const parsedKeys = keys.map((key) => parseKey(key, { parseInt }))
  const columns = getColumns(parsedKeys, primary)
  const ids = getIds(parsedKeys)
  return {
    parsedKeys,
    columns,
    ids
  }
}

const createLoader = (
  table: string,
  options: CreateLoaderOptions = {}
) => async (rawKeys: string[]) => {
  const { parseInt = true, primary = 'id' } = options

  const { parsedKeys, columns, ids } = parseKeys(rawKeys, primary, { parseInt })

  const where = {
    [primary]: {
      $in: ids
    }
  }

  const metaTable = (<any>meta)[table]

  const rows = await metaTable.findAll({
    raw: true,
    attributes: columns,
    where
  })

  if (rows.length === 0) {
    return [...Array(rawKeys.length)].fill(null)
  }

  const rowMap = rows.reduce((map: Map<string, any>, row: any) => {
    const id = row[primary]
    map.set(id, row)
    return map
  }, new Map<string, any>())

  return parsedKeys.map((key: ParsedKey) => {
    const row = rowMap.get(key.id)
    if (row == null) {
      return null
    }
    return row[key.column]
  })
}

export { key }

export default createLoader
