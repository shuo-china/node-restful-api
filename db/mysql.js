const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bdf'
})

function exec(...args) {
  return new Promise((resolve, reject) => {
    connection.connect()

    connection.query(...args, (err, results) => {
      if (err) {
        throw new Error('123')
      }
      resolve(results)
    })

    connection.end()
  })
}

module.exports = {
  exec
}
