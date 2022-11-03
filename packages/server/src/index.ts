import compression from 'compression'
import cors from 'cors'
import express from 'express'
// import history from 'connect-history-api-fallback'
import { createServer } from 'http'
import { Constants, Log } from '@pardes/common'
import { createBibleRoutes } from './books'

const app = express()
const server = createServer(app)

// app.use(history())
app.use(cors())
app.use(express.json())
app.use(compression())
app.use(express.static(Constants.PUBLIC_DIR))

createBibleRoutes(app)
app.get('/', (req: any, res: any) => res.sendFile(Constants.VUE_APP_PATH))
app.get('*', (req: any, res: any) => res.status(404).send('Route does not exist.'))

server.listen(Constants.PORT, async () => Log.info(`Listening on localhost:${Constants.PORT}`))

process.on('SIGTERM', () => {
  Log.info(`Graceful termination...`)
  process.exit(1)
})

process.on('SIGINT', () => {
  Log.info(`Graceful interruption...`)
  process.exit(0)
})
