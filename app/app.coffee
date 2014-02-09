config      = require './config'
express     = require 'express'
http        = require 'http'
path        = require 'path'

app = express()

app.set 'port', process.env.PORT || 3000
app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.use express.favicon()
app.use express.logger('dev')
app.use express.json()
app.use express.urlencoded()
app.use express.methodOverride()
app.use express.cookieParser('i know who it is 1238')
app.use express.static(path.join(__dirname, '..', 'public'))
app.use app.router


# Database Configuration
mongoose = require 'mongoose'
mongoose.connect config.mongo.uri
app.set 'game', require('./models/game')(mongoose)


# Routes
require('./routes/twilio') app

server = http.createServer app
server.listen app.get('port'), () ->
  console.log "Express server listening on port " + app.get('port')