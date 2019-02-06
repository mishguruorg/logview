import Dataloader from 'dataloader'

import createLoader from '../dataloader/loader'

const createDataloader = () => {
  return {
    Log: new Dataloader(createLoader('Log'))
  }
}

export default createDataloader
