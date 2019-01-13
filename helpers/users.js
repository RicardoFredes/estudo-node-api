const sendResponse = require('./sendResponse')

const sendResponseUsers = (req, res, users, meta) => {
  return sendResponse(res, users, parseUsers, meta)
}

const parseUsers = users => ({
  type: 'users',
  id: users.id,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
  attributes: {
    id: users.id,
    name: users.name,
  }
})

module.exports = { sendResponseUsers }
