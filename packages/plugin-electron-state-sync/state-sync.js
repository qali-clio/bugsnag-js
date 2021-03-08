const EventEmitter = require('events')

module.exports = {
  name: 'stateSync',
  load: (client) => {
    const emitter = new EventEmitter()

    const origSetUser = client.setUser
    const setUserFromSource = source => (...args) => {
      const ret = origSetUser.call(client, ...args)
      emitter.emit('UserUpdate', { user: client.getUser() }, source)
      return ret
    }
    client.setUser = setUserFromSource('main')

    const origSetContext = client.setContext
    const setContextFromSource = source => (...args) => {
      const ret = origSetContext.call(client, ...args)
      emitter.emit('ContextUpdate', { context: client.getContext() }, source)
      return ret
    }
    client.setContext = setContextFromSource('main')

    const origAddMetadata = client.addMetadata
    const addMetadataFromSource = source => (...args) => {
      const ret = origAddMetadata.call(client, ...args)
      const [section, keyOrValues, value] = args
      emitter.emit('AddMetadata', { section, keyOrValues, value }, source)
      return ret
    }
    client.addMetadata = addMetadataFromSource('main')

    const origClearMetadata = client.clearMetadata
    const clearMetadataFromSource = (source) => (...args) => {
      const ret = origClearMetadata.call(client, ...args)
      const [section, key] = args
      emitter.emit('ClearMetadata', { section, key }, source)
      return ret
    }
    client.clearMetadata = clearMetadataFromSource('main')

    return {
      emitter,
      setUserFromSource,
      setContextFromSource,
      addMetadataFromSource,
      clearMetadataFromSource
    }
  }
}
