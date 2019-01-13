const getMetaPagination = (req, count, limit) => {
  const page = Number(req.query.page) || 1
  const path = req.route.path
  const pages = Math.ceil(count/limit)
  const links = { current: req.url }
  if (page > 1) {
    const lastPage = page - 1
    links.last = `${path}?page=${lastPage}`
  }
  if (page < pages) {
    const nextPage = page + 1
    links.next = `${path}?page=${nextPage}`
  }
  return { links, pages }
}

const sendResponse = (res, data, parser, meta) => {
  if (data.length) meta.count = data.length
  const normalizeData = !data.length ? [data] : data
  const parseData = normalizeData.map(parser)
  return res.status(201).json({ meta, data: parseData })
}

module.exports = { sendResponse, getMetaPagination }
