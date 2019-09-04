import { getServer } from '../../config'
import getAuthToken from './../../auth'

export const command = 'playground'

export const describe = 'Open the GraphQL API playground'

interface Options {
  server: string,
}

export async function handler (argv: Options) {
  const server = await getServer(argv)
  const token = await getAuthToken(server.auth)

  console.log(`URL: ${server.http}`)
  console.log(JSON.stringify({ Authorization: `Bearer ${token}` }, null, 2))
}
