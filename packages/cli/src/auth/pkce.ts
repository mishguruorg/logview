import crypto from 'crypto'
import fetch from 'isomorphic-fetch'
import express from 'express'
import { DateTime } from 'luxon'

import { Session, getSession, setSession } from './store'

// how much time we need before we discard the current access token
// and get a new one
const MIN_TIME = 30 * 1000

class RequiresLoginError extends Error {
  public constructor () {
    super('You need to login')
  }
}

interface RequestViaRefreshTokenOptions {
  domain: string,
  clientId: string,
  refreshToken: string,
}

async function requestViaRefreshToken (
  options: RequestViaRefreshTokenOptions,
): Promise<Session> {
  const { domain, clientId, refreshToken } = options

  const now = DateTime.local()

  const res = await fetch(`https://${domain}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      client_id: clientId,
      refresh_token: refreshToken,
    }),
  })

  const { access_token: accessToken, expires_in: expiresIn } = await res.json()

  const expiresAt = now.plus({ seconds: expiresIn }).toMillis()

  return {
    accessToken,
    refreshToken,
    expiresAt,
  }
}

interface GetTokenOptions {
  serviceName: string,
  domain: string,
  clientId: string,
}

async function getToken (options: GetTokenOptions): Promise<string> {
  const { serviceName, clientId, domain } = options
  const session = await getSession(serviceName)

  if (session == null || session.refreshToken == null) {
    throw new RequiresLoginError()
  }

  if (session.expiresAt <= Date.now() + MIN_TIME) {
    const nextSession = await requestViaRefreshToken({
      domain,
      clientId,
      refreshToken: session.refreshToken,
    })
    setSession(serviceName, nextSession)

    return nextSession.accessToken
  }

  return session.accessToken
}

function sha256 (str: string) {
  return crypto
    .createHash('sha256')
    .update(str)
    .digest()
}

function base64URLEncode (buffer: Buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

interface RequestViaAuthorizationCodeOptions {
  code: string,
  domain: string,
  clientId: string,
  verifier: string,
  redirectUri: string,
}

async function requestViaAuthorizationCode (
  options: RequestViaAuthorizationCodeOptions,
): Promise<Session> {
  const { code, domain, clientId, verifier, redirectUri } = options

  const now = DateTime.local()

  const res = await fetch(`https://${domain}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: clientId,
      code_verifier: verifier,
      code: code,
      redirect_uri: redirectUri,
    }),
  })

  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  } = await res.json()

  const expiresAt = now.plus({ seconds: expiresIn }).toMillis()

  return {
    accessToken,
    refreshToken,
    expiresAt,
  }
}

interface StartChallengeRequestOptions {
  serviceName: string,
  domain: string,
  audience: string,
  clientId: string,
  redirectUri: string,
  port: number,
}

async function startChallengeRequest (options: StartChallengeRequestOptions) {
  const { serviceName, domain, audience, clientId, redirectUri, port } = options

  const verifier = base64URLEncode(crypto.randomBytes(32))
  const challenge = base64URLEncode(sha256(verifier))

  const url = [
    `https://${domain}/authorize`,
    `?audience=${audience}`,
    `&scope=offline_access`,
    `&response_type=code`,
    `&client_id=${clientId}`,
    `&code_challenge=${challenge}`,
    `&code_challenge_method=S256`,
    `&redirect_uri=${redirectUri}`,
  ].join('')

  const tokenPromise = new Promise<string>((resolve) => {
    let receivedCode = false
    const app = express()

    const server = app.listen(port)

    app.use('/', async (req, res) => {
      const { code } = req.query

      if (receivedCode) {
        res.status(404).end('Already received code...')
      }

      if (typeof code !== 'string' || code.trim().length === 0) {
        res.status(401).end('Invalid code')
      }

      receivedCode = true

      const session = await requestViaAuthorizationCode({
        code,
        domain,
        clientId,
        verifier,
        redirectUri,
      })

      res
        .set({ 'Content-Type': 'text/html' })
        .end('You have been logged in. Please close this window...')
      await server.close()

      await setSession(serviceName, session)
      resolve(session.accessToken)
    })
  })

  return {
    url,
    tokenPromise,
  }
}

export { RequiresLoginError, getToken, startChallengeRequest }
