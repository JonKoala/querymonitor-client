const fs = require('fs')
const yaml = require('js-yaml')

module.exports = yaml.load(fs.readFileSync('appconfig.yml'));