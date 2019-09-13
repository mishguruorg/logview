import { createService } from '@mishguru/turbine'
import createDriver from '@mishguru/turbine-driver-switch'

const service = createService({
  serviceName: 'logview',
  driver: createDriver({
    defaultDriver: '@mishguru/turbine-driver-aws-fanout',
  }),
})

export default service
