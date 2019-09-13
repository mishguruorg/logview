import meta from '@mishguru/mishmeta'

import whereInNotIn from '../../../whereInNotIn'

interface SearchLogsInput {
  last: number,
  beforeDate: Date,
  afterDate: Date,

  afterID?: string,
  beforeID?: string,

  payload?: string,
  sentFrom?: string[],
  userId?: string[],
  type?: string[],
}

const searchLogs = async (input: SearchLogsInput) => {
  const {
    last,
    beforeDate,
    afterDate,

    afterID,
    beforeID,

    payload,
    sentFrom,
    userId,
    type,
  } = input

  let desc = true

  let replacements: Record<
  string,
  string | string[] | Date | number | number[] | boolean | boolean[]
  > = {
    afterDate,
    beforeDate,
    userId,
    type,
    afterID,
    beforeID,
  }

  let where: string[] = ['createdAt >= :afterDate']

  if (beforeDate != null) {
    where.push('createdAt <= :beforeDate')
  }

  if (payload != null) {
    const [, key, value] = payload.match(/([^:]+):(.*)/)
    where.push(`JSON_EXTRACT(payload, '$.${key}') = :payloadValue`)
    replacements.payloadValue = (() => {
      if (value === 'true') {
        return true
      } else if (value === 'false') {
        return false
      } else if (isNaN(parseInt(value, 10)) === false) {
        return parseInt(value, 10)
      } else {
        return value
      }
    })()
  }
  if (userId != null) {
    const { replacements: r, where: w } = whereInNotIn('userId', userId)
    replacements = { ...replacements, ...r }
    where = where.concat(w)
  }
  if (type != null) {
    const { replacements: r, where: w } = whereInNotIn('name', type)
    replacements = { ...replacements, ...r }
    where = where.concat(w)
  }
  if (sentFrom != null) {
    const { replacements: r, where: w } = whereInNotIn('sentFrom', sentFrom)
    replacements = { ...replacements, ...r }
    where = where.concat(w)
  }

  if (afterID != null) {
    where.push('messageId < (:afterID)')
    desc = true
  }

  if (beforeID != null) {
    where.push('messageId > (:beforeID)')
    desc = false
  }

  const allResults = await meta.sequelize.query(
    `
SELECT /*+ MAX_EXECUTION_TIME(10000) */
  messageId
FROM ${meta.Log.tableName}
WHERE
  ${where.join(' AND\n  ')}
ORDER BY createdAt ${desc ? 'DESC' : 'ASC'}
LIMIT ${last + 1}`,
    {
      type: meta.sequelize.QueryTypes.SELECT,
      replacements,
    },
  )

  const results = allResults.slice(0, last)

  if (desc === false) {
    results.reverse()
  }

  return {
    results,
    cursors: {
      hasNext: allResults.length > last,
      beforeID: results.length > 0 ? results[0].messageId : null,
      afterID:
        results.length > 0 ? results[results.length - 1].messageId : null,
    },
  }
}

export default searchLogs
