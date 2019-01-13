const error = (title, route, status, detail, message) => {
  return { status, source: { pointer: route }, title, detail: detail || message }
}

const getError = (status, route, message) => {
  switch (status) {
    case 400:
      return error('Invalid Attribute', route, status, 'User id is NOT valid', message)
    case 404:
      return error('Not Found', route, status, 'User id is NOT exist', message)
    default:
      return error('Not Found', route, 400, 'Paramters NOT valids', message)
  }
}

const sendError = (req, res, statusCode, id, errorsValidator = {}) => {
  const props = !id ? {} : { value: id, path: 'id' }
  const errorsList = errorsValidator && errorsValidator.errors || [ null ]
  const errors = errorsList.map(error => getError(statusCode, req.url, error && error.message))
  return res.status(statusCode).json({ type: 'errors', errors, ...props })
}

module.exports = { sendError }
