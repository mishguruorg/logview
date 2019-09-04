import metaDb from '@mishguru/mishmeta'

import { createLoaderForTable, Loader } from './dataloader'

export interface Db {
  LogByMessageId: Loader<string>,
  LogByParentMessageId: Loader<string>,
  LogType: Loader<string>,
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
    LogType: createLoaderForTable<string>({
      table: metaDb.LogType,
      primaryKey: 'id',
      parseKeyAsNumber: false,
      where: {},
    }),
  }
}

export default createDb
