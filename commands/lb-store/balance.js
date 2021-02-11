const mongo = require('../../mongo')
const gagSchema = require('../../schemas/gag-schema')

module.exports = {
    name: 'Баланс', // Optional
    commands: ['balance', 'bal'], // Optional
    aliases: [], // Optional
    maxArgs: 0,
    cooldown: '10s',
    category: 'Магазин',
    description: 'Проверить баланс',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const mainGuild = client.guilds.cache.get('579709976029691905')
        const logChannel = mainGuild.channels.cache.get('807116096586252289')
        const logMessage = `>${message.author.username}(${message.guild.member(message.author).nickname}) узнал свой баланс`
                await mongo().then(async mongoose => {
                    try {
                        const result = await gagSchema.findOne({_id: message.author.id})
                        if (!result) {
                            return
                        }
                        message.reply(`На твоем счету: ${result.count}`)
                    } finally {
                        mongoose.connection.close()
                    }
                })
            
        
    }
}