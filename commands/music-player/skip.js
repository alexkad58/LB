module.exports = {
    name: 'Пропуск трека', // Optional
    commands: ['skip'], // Optional
    aliases: ['skip'], // Optional
    cooldown: '10s',
    category: 'Музыка',
    description: 'Пропускает текущий трек',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        Options = {
            sortBy: 'relevance' // Default - 'relevance'
        }
        if (!message.member.voice.channel) {
            message.react('🚫')
            return
        }
        if (client.player.isPlaying(message.guild.id) === true) {
            client.player.skip(message.guild.id)
        } else {
            message.react('🚫')
            return
        }
    }
}