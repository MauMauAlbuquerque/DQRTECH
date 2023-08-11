import express from 'express'
import db from './config/dbConfig.js'
import routes from './routes/index.js'
import cors from 'cors'

db.on('error', console.log.bind(console, 'Connection Error'))
db.once('open', () => { console.log('Connection Established') })

const app = express()
app.use(cors())
app.use(express.json())

routes(app)

export default app
