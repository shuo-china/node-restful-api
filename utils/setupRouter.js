const fs = require('fs')
const path = require('path')

function setupRouter(app) {
  const controllerPath = path.resolve('app/controller')
  const modules = fs.readdirSync(controllerPath)

  modules.forEach(m => {
    const moduleName = path.basename(m, '.js')
    const modulePath = `@app/controller/${moduleName}`
    const module = require(modulePath)
    app.use(`/${moduleName}`, module)
  })
}

module.exports = setupRouter
