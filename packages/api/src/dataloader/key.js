type $parseKeyOptions = {
  parseInt?: boolean
}

const key = (id: number, column: string) => {
  return `${id}:${column}`
}

const parseKey = (key: string, options: $parseKeyOptions = {}) => {
  const [idString, column] = key.split(':')

  // by default we parse keys as integers, but some keys need to be preserved
  // as strings. If you set `options.parseInt = false` then the conversion is
  // skipped.
  const id = options.parseInt === false ? idString : parseInt(idString, 10)

  return { id, column }
}

export { key, parseKey }
