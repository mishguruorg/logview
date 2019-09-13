export interface Log {
  id: string,
  userId: number,
  sentFrom: string,
  type: string,
  sentAt: string,
}

export type Filter = {
  userId: number[],
  type: string[],
  sentFrom: string[]
}

