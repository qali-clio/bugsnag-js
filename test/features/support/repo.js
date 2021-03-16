const exec = require('child_process').exec
const { promisify } = require('util')
const { randomBytes } = require('crypto')

module.exports = {
  publishPackages: async () => {
    const run = promisify(exec)
    const id = randomBytes(12).toString('hex')
    const buildVersion = `200.1.0-canary.${id}`
    await run('npm run local-npm:publish-all',
      { env: { ...process.env, VERSION_IDENTIFIER: buildVersion } })
    return buildVersion
  }
}
