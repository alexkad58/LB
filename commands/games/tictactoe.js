const { tictactoe } = require('reconlx')

module.exports = {
    name: 'Крестики нолики', // Optional
    commands: ['ttt'], // Optional
    aliases: ['ttt'], // Optional
    minArgs: 1,
    expectedArgs: '<юзер>',
    cooldown: '10s',
    category: 'Игры',
    description: 'Игра в крестики нолики',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const member = message.mentions.members.first()
            if (!member) message.channel.send('Укажите оппонента')
        new tictactoe({
            player_two: member,
            message: message
        })
    }
}