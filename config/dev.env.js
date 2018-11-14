'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IMAGE_URL:'"https://bk.3bd.com.cn/"',
  WEIXIN_BUG:'true'
})
