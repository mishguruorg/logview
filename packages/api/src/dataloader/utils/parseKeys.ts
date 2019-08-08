import { parseKey } from './key'
import { getColumns, getIds } from './attributeSet'

interface Options {
  parseKeyAsNumber: boolean,
}

const parseKeys = <ID>(
  rawKeys: string[],
  primaryKey: string,
  options: Options,
) => {
  const { parseKeyAsNumber } = options

  const keys = rawKeys.map((key) => parseKey<ID>(key, { parseKeyAsNumber }))

  const attributes = getColumns<ID>(keys, primaryKey)
  const ids = getIds<ID>(keys)

  return {
    keys,
    attributes,
    ids,
  }
}

export default parseKeys
