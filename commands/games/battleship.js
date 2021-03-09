const { DiscordBattleShip } = require('discord-battleship')

module.exports = {
    name: 'Морской бой', // Optional
    commands: ['bs'], // Optional
    aliases: ['bs'], // Optional
    cooldown: '10s',
    category: 'Игры',
    description: 'Игра в морской бой',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const BattleShip = new DiscordBattleShip({
            embedColor: "RED", /* Any Discord.js Color Resolvable will work. */
            prefix: prefix, /* This is the prefix that will be used in the users DM's for commands. 
                            You can set this to any string. */
        });
        await BattleShip.createGame(message)
    }
}