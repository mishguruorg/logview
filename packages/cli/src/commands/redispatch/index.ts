import { Argv } from 'yargs'
import gql from 'graphql-tag'
import chalk from 'chalk'

import { RootArgv } from '../../types'

import createClient from '../../client'
import { getServer } from '../../config'

interface RedispatchArgv extends RootArgv {
  id: string,
}

export const command = 'redispatch [id]'

export const describe = 'Redispatch a log'

export const builder = (yargs: Argv) => {
  yargs.positional('id', {
    demand: true,
    type: 'string',
  })
}

export async function handler (argv: RedispatchArgv) {
  const { id } = argv

  const client = await createClient(getServer(argv))

  const { data } = await client.mutate({
    variables: {
      id,
    },
    mutation: gql`
      mutation($id: ID!) {
        redispatch(id: $id)
      }
    `,
  })

  console.info(`Dispatched as ${chalk.blue(data.redispatch)}`)

  client.stop()
  process.exit(0)
}
