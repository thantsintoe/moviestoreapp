const zawgyiTranslationDB = require('./translationDB')
const uniTranslationDB = require('./translationDB_Uni')

const translate = (inputStr) => {
    return zawgyiTranslationDB[inputStr]
}

module.exports = translate
