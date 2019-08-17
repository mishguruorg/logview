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
    try {
      const jsonString = await KeyTar.getPassword(serviceName, ACCOUNT_KEY)
      session = JSON.parse(jsonString)
      CURRENT_SESSION_MAP.set(serviceName, session)
    } catch (error) {
      if (error != null && typeof error.message === 'string' && error.message.toString().match(/org.freedesktop.secrets/)) {
        console.warn(`
********************************************************************************
WARNING: node-keytar could not be used.
Your session token will not be persisted, and you will need to login each time
you use this program.

Please follow the install instructions:
https://github.com/atom/node-keytar

# ubuntu
sudo apt-get install libsecret-1-dev gnome-keyring

# redhat
sudo yum install libsecret-devel

# arch
sudo pacman -S libsecret
********************************************************************************
`)
      } else {
        console.error({ error })
      }
    }
  }
  return session
}

const setSession = async (serviceName: string, session: Session) => {
  CURRENT_SESSION_MAP.set(serviceName, session)
  try {
    await KeyTar.setPassword(serviceName, ACCOUNT_KEY, JSON.stringify(session))
  } catch (error) {
    console.error({ error })
  }
}

export { getSession, setSession }
