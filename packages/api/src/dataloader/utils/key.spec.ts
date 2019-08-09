import test from 'ava'

import { key, parseKey } from './key'

const ID = 999
const COLUMN = 'username'
const KEY = '999:username'

test('key', (t) => {
  t.is(key(ID, COLUMN), KEY)
})

test('parseKey', (t) => {
  t.deepEqual(parseKey(KEY), { id: ID, column: COLUMN })
})
