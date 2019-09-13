import meta from '@mishguru/mishmeta'
import { GraphQLServer } from 'graphql-yoga'
import jwksRsa from 'jwks-rsa'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import schema from './schema'
import service from './service'

const AUTH0_CONFIG = {
  domain: 'mishguruadmin.auth0.com',
  audience: 'https://logview.mish.guru/',
}

const jwksClient = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${AUTH0_CONFIG.domain}/.well-known/jwks.json`,
})

const getKey = (header: any, callback: any) => {
  jwksClient.getSigningKey(header.kid, (error: Error, key: any) => {
    if (error != null) {
      console.error(error)
      callback(error)
      return undefined
    }
    const signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

meta.connect().then(async () => {
  await service.start()

  const server = new GraphQLServer({
    schema,
    context: async (req) => {
      try {
        let token
        if (req.connection) {
          token = req.connection.context.authorization.split(' ')[1]
        } else if (req.request) {
          token = req.request.headers.authorization.split(' ')[1]
        }

        await promisify(jwt.verify.bind(jwt))(token, getKey, {
          audience: AUTH0_CONFIG.audience,
          issuer: `https://${AUTH0_CONFIG.domain}/`,
          algorithms: ['RS256'],
        })

        return {
          authorized: true,
          dispatch: service.dispatch,
        }
      } catch (error) {
        return {
          authorized: false,
        }
      }
    },
  })

  server.start(({ port }: { port: number }) =>
    console.info(`Server is listening on ${port}`),
  )
})
