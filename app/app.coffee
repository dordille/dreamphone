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


twilio = require 'twilio'
resp = new twilio.TwimlResponse()

hook = twilio.webhook
	validate: false

app.get '/twilio', hook, (req, res) ->
  twiml = new twilio.TwimlResponse
  twiml.play 'https://s3.amazonaws.com/dreamphone/i_know.mp3'

  res.send twiml


server = http.createServer app
server.listen app.get('port'), () ->
  console.log "Express server listening on port " + app.get('port')