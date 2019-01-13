const { getError } = require('../helpers/errors')
const { parseUser } = require('../helpers/users')

module.exports = app => {
  const User = app.config.sequelize.models.users

  const UserCRUD = {}

  UserCRUD.post = (req, res) => {
    const { name } = req.body
    const pointer = req.route.path
    return User.create({ name })
     .then(user => res.status(201).json({  data: [parseUser(user)] }))
     .catch(error => res.status(400).json({
       errors: parseError(error, pointer, 'Invalid Attribute', 400)
     }))
  }

  UserCRUD.getAll = (req, res) =>
    User.findAll().then(users => {
      const data = users.map(parseUser)
      return res.status(201).json({ meta: { count: users.length }, data })
    })

  UserCRUD.get = (req, res) => {
    const { id } = req.params
    User.findById(id)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            errors: [{
              status: 404,
              title: 'Not Found',
              source: { pointer: req.route.path },
              detail: 'User id is NOT exist',
              value: id,
              path: 'id'
            }]
          })
        }
        return res.status(201).json({  data: [parseUser(user)] })
      })
      .catch(() => res.status(400).json({
        errors: [{
          status: 400,
          title: 'Invalid Attribute',
          source: { pointer: req.route.path },
          detail: 'User id is NOT valid',
          value: id,
          path: 'id'
        }]
      }))
  }

  return UserCRUD
}

const parseError = ({ errors }, pointer, title, status) =>
  errors.map(({message, value, path}) => ({
    status,
    title,
    source: { pointer },
    detail: message,
    value,
    path,
  }))
