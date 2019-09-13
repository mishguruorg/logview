import { getServer } from '../../config'
import getAuthToken from './../../auth'

export const command = 'auth-token'

export const describe = 'Display the auth token'

interface Options {
  server: string,
}

export async function handler (argv: Options) {
  const server = await getServer(argv)
  const token = await getAuthToken(server.auth)

  console.warn(`Server URL: ${server.http}`)
  console.warn(
    'Pro-tip: copy this to auth token to your clipboard with "logv auth-token | pbcopy"',
  )
  console.log(JSON.stringify({ Authorization: `Bearer ${token}` }, null, 2))
}
