const sendResponse = (res, data, parser, meta) => {
  if (data.length) meta.count = data.length
  const normalizeData = !data.length ? [data] : data
  const parseData = normalizeData.map(parser)
  return res.status(201).json({ meta, data: parseData })
}

module.exports = sendResponse
