const volumeSchema = require('../../schemas/volume-schema')

module.exports = {
    name: 'Имба2', // Optional
    commands: ['setvolume'], // Optional
    aliases: ['sv'], // Optional
    minArgs: 1,
    ownerOnly: true,
    expectedArgs: '<громкость>',
    cooldown: '10s',
    category: 'Приколы',
    description: 'Имба',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        await volumeSchema.findOneAndUpdate({
            _id: message.guild.id,
        },{
            _id: message.guild.id,
            volume: args[0]
        },{
            upsert: true
        })
        message.react('👌')
    }
}