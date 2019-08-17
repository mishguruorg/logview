import KeyTar from 'keytar'

export interface Session {
  accessToken: string,
  refreshToken: string,
  expiresAt: number,
}

const ACCOUNT_KEY = 'pkce'

const CURRENT_SESSION_MAP = new Map<string, Session>()

const getSession = async (serviceName: string) => {
  let session = CURRENT_SESSION_MAP.get(serviceName)
  if (session == null) {
    const jsonString = await KeyTar.getPassword(serviceName, ACCOUNT_KEY)
    try {
      session = JSON.parse(jsonString)
      CURRENT_SESSION_MAP.set(serviceName, session)
    } catch {}
  }
  return session
}

const setSession = async (serviceName: string, session: Session) => {
  CURRENT_SESSION_MAP.set(serviceName, session)
  await KeyTar.setPassword(serviceName, ACCOUNT_KEY, JSON.stringify(session))
}

export { getSession, setSession }
