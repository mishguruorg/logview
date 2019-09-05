const whereInNotIn = (key: string, input: string[]) => {
  const keyIn = `${key}In`
  const keyNotIn = `${key}NotIn`

  const where: string[] = []
  const replacements: Record<string, string[]> = {
    [keyIn]: [],
    [keyNotIn]: [],
  }

  for (const item of input) {
    if (item.endsWith('!')) {
      replacements[keyNotIn].push(item.slice(0, -1).trim())
    } else {
      replacements[keyIn].push(item)
    }
  }

  if (replacements[keyIn].length > 0) {
    where.push(`${key} IN (:${keyIn})`)
  } else if (replacements[keyNotIn].length > 0) {
    where.push(`(${key} IS NULL OR ${key} NOT IN (:${keyNotIn}))`)
  }

  return {
    where,
    replacements,
  }
}

export default whereInNotIn
