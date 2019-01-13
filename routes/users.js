module.exports = app => {
  const Users = app.controllers.Users

  app.post('/api/users', Users.post)

  app.get('/api/users', Users.getAll)

  app.get('/api/users/:id', Users.get)

  app.put('/api/users/:id', Users.put)

  app.delete('/api/users/:id', Users.delete)
}
