const { sendError } = require('../helpers/errors')
const { sendResponseUsers } = require('../helpers/users')
const { getMetaPagination } = require('../helpers/responses')

module.exports = app => {
  const Users = app.config.sequelize.models.users
  return {

    getAll: (req, res) => {
      const { page = 1 } = req.query
      const limit = 5
      const offset = page - 1
      if (offset < 0) return sendError(req, res, 400, 'Pagination value is NOT valid')
      return Users.findAndCountAll({ limit, offset })
        .then(({ count, rows }) => {
          const meta = getMetaPagination(req, count, limit)
          return sendResponseUsers(req, res, rows, meta)
        })
        .catch(errors => sendError(req, res, 404, null, errors))
    },

    get: (req, res) => {
      const { id } = req.params
      return Users.findById(id)
        .then(users => sendResponseUsers(req, res, users))
        .catch(errors => sendError(req, res, 400, id, errors))
    },

    post: (req, res) => {
      const data = req.body
      return Users.create(data)
       .then(users => sendResponseUsers(req, res, users))
       .catch(errors => sendError(req, res, 400, null, errors))
    },

    put: (req, res) => {
      const { id } = req.params
      const data = req.body
      return Users.update(data, { where: { id } })
        .then(() => Users.findById(id))
        .then(users => sendResponseUsers(req, res, users))
        .catch(errors => sendError(req, res, 400, null, errors))
    },

    delete: (req, res) => {
      const { id } = req.params
      return Users.findById(id)
        .then(users => Users.destroy({ where: { id: users.id } }))
        .then(() => res.json({ type: "success", content: "User deleted" }))
        .catch(errors => sendError(req, res, 404, null, errors))
    },

  }
}

const getMeta = (req, count, limit) => {
  const page = Number(req.query.page)
  const path = req.route.path
  const pages = Math.ceil(count/limit)
  const links = { current: req.url }

  if (page) {
    const lastPage = page - 1
    links.last = `${path}?page=${lastPage}`
  }
  if (page < pages) {
    const nextPage = page + 1
    links.next = `${path}?page=${nextPage}`
  }
  return { links, pages }
}
