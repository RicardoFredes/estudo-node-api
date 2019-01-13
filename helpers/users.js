const parseUser = user => ({
  type: 'users',
  id: user.id,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  attributes: {
    id: user.id,
    name: user.name,
  }
})

module.exports = { parseUser }
