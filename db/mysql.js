const mysql = require('mysql2')
const config = require('@config/db')

const pool = mysql.createPool(config.mysql)

function exec(...args) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }

      connection.query(...args, function (error, results, fields) {
        connection.release()
        if (error) {
          reject(error)
          return
        }

        resolve(results)
      })
    })
  })
}

module.exports = {
  exec
}
