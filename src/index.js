import express from 'express'
import { jokeByType } from 'official_joke_api/handler'

export default class {
  constructor (options) {
    this.name = options.name || 'Helio Jokes'
    this.publicPaths = [options.path, new RegExp(`^${options.path}/.*`)]

    const self = this
    const router = this.router = express.Router()

    router.get('/', this.getJoke)

    router.use(function (err, req, res, next) {
      console.error(`[MOD ERROR] (${self.name})`, err.stack)
      return res.status(500).json({ error: err.toString() })
    })
  }

  getJoke (req, res, next) {
    const type = req.query.type || 'general'
    const amount = isNaN(req.query.amount) ? 1 : parseInt(req.query.amount)
    const jokes = jokeByType(type, amount)
    res.json(jokes)
  }
}
