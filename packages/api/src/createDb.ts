import metaDb from '@mishguru/mishmeta'

import { createLoaderForTable, Loader } from './dataloader'

export interface Db {
  LogByMessageId: Loader<string>,
  LogByParentMessageId: Loader<string>,
}

const createDb = (where: Record<string, any>): Db => {
  return {
    LogByMessageId: createLoaderForTable<string>({
      table: metaDb.Log,
      primaryKey: 'messageId',
      parseKeyAsNumber: false,
      where,
    }),
    LogByParentMessageId: createLoaderForTable<string>({
      table: metaDb.Log,
      primaryKey: 'parentMessageId',
      parseKeyAsNumber: false,
      where,
    }),
  }
}

export default createDb
