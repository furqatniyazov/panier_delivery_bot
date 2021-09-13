const commands = `
/start - Перезапустить бота
/help - Помощь
`

const connectOptions = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Panier'
}


module.exports.commands = commands
module.exports.connectOptions = connectOptions