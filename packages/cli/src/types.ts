import { AuthConfig } from './auth'

export interface RootArgv {
  server: string,
}

export interface ConfigFile {
  default: string,
  servers: Record<string, ServerConfig>,
}

export interface ServerConfig {
  http: string,
  ws: string,
  auth: AuthConfig,
}

export type Payload = Record<string, any>

export interface Log {
  id: string | number,
  type: string,
  payload: Payload,
  sentFrom: string,
  sentAt: string,
}

export type LogPrinter = (logs: Log[]) => void
