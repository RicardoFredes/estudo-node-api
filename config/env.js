module.exports = {
  database: "teste",
  username: "admin",
  password: "admin",
  params: {
    host: 'localhost',
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
