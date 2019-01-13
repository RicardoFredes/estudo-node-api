const app = require('./config/express')()

const port = 4000
app.listen(port, () => console.log(`Running on http://localhost:${port}`))
