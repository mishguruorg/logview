import { getToken, startChallengeRequest, RequiresLoginError } from './pkce'

const SERVICE_NAME = 'logview-cli'
const REDIRECT_URI = 'http://localhost:38448/'
const PORT = 38448

export interface AuthConfig {
  domain: string,
  clientId: string,
  audience: string,
}

const login = async (config: AuthConfig) => {
  const { domain, audience, clientId } = config

  const { url, tokenPromise } = await startChallengeRequest({
    serviceName: SERVICE_NAME,
    domain,
    audience,
    clientId,
    redirectUri: REDIRECT_URI,
    port: PORT,
  })

  console.log('Please visit the following url:')
  console.log(url)

  return tokenPromise
}

const getAuthToken = async (config: AuthConfig) => {
  const { domain, clientId } = config

  try {
    const token = await getToken({
      serviceName: SERVICE_NAME,
      domain,
      clientId,
    })
    return token
  } catch (error) {
    if (error instanceof RequiresLoginError) {
      const token = await login(config)
      return token
    }
    throw error
  }
}

export default getAuthToken
