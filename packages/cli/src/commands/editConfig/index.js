import editor from 'editor'

import { CONFIG_PATH } from '../../config'

export const command = ['edit-config']

export const describe = 'Open the server config in your editor'

export const builder = {}

export async function handler(argv) {
  editor(CONFIG_PATH)
}
