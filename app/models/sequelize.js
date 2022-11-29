const { mysql: config } = require('@config/db')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    define: {
      schema: config.prefix,
      schemaDelimiter: '_',
      // 禁止表名复数化
      freezeTableName: true,
      // 字段名下划线
      underscored: true,
      createdAt: 'createTime',
      deletedAt: 'deleteTime',
      updatedAt: 'updateTime'
    }
  }
)

sequelize.authenticate().catch(err => {
  console.log('Unable to connect to the database:', err.message)
})

module.exports = sequelize
