module.exports = app => {
  const Users = app.controllers.Users

  app.post('/api/users', Users.post)

  app.get('/api/users', Users.getAll)

  app.get('/api/users/:id', Users.get)
}
