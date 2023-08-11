import app from './src/app.js'

const port = process.env.port || 3002

app.listen(port, () => {
  console.log(`server runing in local port ${port}`)
})