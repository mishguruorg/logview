declare module 'window-size' {
  interface WindowSize {
    width: number,
    hieght: number,
    type: string,
  }

  export function get(): WindowSize
}
