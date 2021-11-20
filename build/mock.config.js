const fs = require('fs')
const path = require('path')

const mockBaseURL = 'https://localhost:3000'
const realBaseURL = 'https://note-server.hunger-valley.com'

exports.config = function({ isDev = true} = {isDev:true} ) {//解构赋值，设置默认值
  //反引号内是js内容
  let fileTxt = `
  module.exports = {
    baseURL:'${isDev ? mockBaseURL : realBaseURL}'
    }
    `
  fs.writeFileSync(path.join(__dirname,'../src/helpers/config-baseURL.js'),fileTxt)
}
