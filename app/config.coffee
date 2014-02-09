env = process.env.NODE_ENV || 'development'

switch env
  when 'development'
    mongo =
      uri: 'mongodb://localhost/dreamphone'

  when 'production'
    mongo =
      uri: process.env.MONGOHQ_URL

module.exports =
  mongo: mongo
