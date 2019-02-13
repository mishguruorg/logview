declare module '@mishguru/mishmeta' {
  type Sequelize = {
    fn: (name: string) => any
    transaction: (fn: Function) => Promise<object>
  }

  export const Log: any

  export function init(credentials: object): Promise<void>
}
