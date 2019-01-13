const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")

let db = null

module.exports = app => {
  if (!db) {
    const { env } = app.config
    const sequelize = new Sequelize(
      env.database,
      env.username,
      env.password,
      env.params
    )
    db = {
      sequelize,
      Sequelize,
      models: {}
    }
    const dir = path.join(__dirname, "../models")
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file)
      const model = sequelize.import(modelDir)
      db.models[model.name] = model
    })
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) db[modelName].associate(db)
    })
    sequelize.authenticate().then(err => {
      if (err) return console.log('Unable to connect to the MySQL database:', err)
      return console.log('Connection has been established successfully.')
    })
    sequelize.sync({ force: false })
      .then(() => console.log(`Database & tables created!`))
  }

  return db
}
