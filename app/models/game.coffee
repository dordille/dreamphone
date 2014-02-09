Sounds     = require "./sounds"
Boys       = require "./boys"
timestamps = require "mongoose-times"

module.exports = (mongoose) ->
  Schema = mongoose.Schema

  GameSchema = new Schema
    number          : type: String, required: true, index: true
    boys            : type: Schema.Types.Mixed
    admirer         : type: Schema.Types.Mixed
    last_called     : type: String
    call_count      : type: Number, default: 0
    active          : type: Boolean, default: true

  GameSchema.plugin timestamps

  GameSchema.statics.create = (number, fn) ->
    boy = Boys[Math.floor(Math.random() * Boys.length)]
    sounds = Sounds
      .filter (sound) ->
        return boy.traits.indexOf(sound.name) < 0
    boys = Boys
      .map (obj) ->
        index = Math.floor(Math.random() * sounds.length)
        obj.sound = sounds[index]
        sounds.splice(index, 1)
        return obj
      .filter (obj) ->
        return obj.name != boy.name

    # Turn boys into object keyed by number
    boyss = {}
    boys.forEach (boy) ->
      boyss[boy.tnumber] = boy

    game =
      number: number
      admirer: boy
      boys: boyss

    @findOneAndUpdate { 'number': number }, { $set: game }, { upsert: true, 'new': true }, (err, game) ->
      fn err, game


  Game = mongoose.model 'Game', GameSchema

  return Game



