twilio = require 'twilio'
reset = '+16466816260'

module.exports = (app) ->
  Game = app.get 'game'

  hook = twilio.webhook
    validate: false

  app.get '/twilio/voice', hook, (req, res) ->
    twiml = new twilio.TwimlResponse

    if req.param('To') == reset
      return Game.create req.param('From'), (err, game) ->
        twiml.say "New game ready to play!"
        res.send twiml

    Game.findOne { number: req.param('From') }, (err, game) ->
      if (err || !game)
        twiml.reject()
      else
        twiml.play game.boys[req.param('To')].sound.file

      res.send twiml

  app.get '/twilio/messaging', hook, (req, res) ->
    from = req.param 'From'
    to = req.param 'To'
    
    Game.findOne { number: from }, (err, game) ->
      twiml = new twilio.TwimlResponse
      if (err || !game)
        twiml.reject()
      else
        twiml.message game.boys[to].sound.tmsg

      res.send twiml

  app.get '/twilio/reset', (req, res) ->
    Game.create req.param('To'), (err, game) ->
      res.json game