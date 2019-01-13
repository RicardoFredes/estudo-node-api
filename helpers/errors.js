const error = (title, route, status, detail) => {
  return { status, source: { pointer: route }, title, detail }
}

const getError = (status, route) => {
  switch (status) {
    case 400:
      return error('Invalid Attribute', route, status, 'User id is NOT valid')
    case 404:
      return error('Not Found', route, status, 'User id is NOT exist')
    default:
      return error('Not Found', route, status, 'User id is NOT exist')
  }
}

module.exports = { getError }
