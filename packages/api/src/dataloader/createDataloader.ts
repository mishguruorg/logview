import Dataloader from 'dataloader'

import createLoader, { key } from '../dataloader/createLoader'

const createDataloader = () => {
  const Log = new Dataloader(createLoader('Log'))

  return {
    Log: {
      load: (id: number, column: string) => Log.load(key(id, column))
    }
  }
}

export default createDataloader
