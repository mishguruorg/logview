export interface Key<ID> {
  id: ID,
  column: string,
}

interface ParseKeyOptions {
  parseKeyAsNumber?: boolean,
}

const key = <ID>(id: ID, column: string) => {
  return `${id}:${column}`
}

const parseKey = <ID>(key: string, options: ParseKeyOptions = {}): Key<ID> => {
  const [idString, column] = key.split(':')
  const id = ((options.parseKeyAsNumber === false
    ? idString
    : parseInt(idString, 10)) as unknown) as ID
  return { id, column }
}

export { key, parseKey }
