const Discord = require('discord.js')

module.exports = {
    name: 'Включить музыку', // Optional
    commands: ['play', 'p'], // Optional
    aliases: ['p'], // Optional
    cooldown: '10s',
    category: 'Музыка',
    description: 'Включает музыку',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const RequestedBy = message.author.id
        const embed = new Discord.MessageEmbed().setColor('#e67e22')
        if (!message.member.voice.channel) {
            message.react('🚫')
            return
        }
        
        if (client.player.isPlaying(message.guild.id) === true) {
            let song = await client.player.addToQueue(message.guild.id, text, {}, RequestedBy)
            song = song.song
            embed
            .setDescription(`Добавил в очередь [${song.name}](${song.url}) [<@${RequestedBy}>]`)
            message.channel.send(embed)
        } else {
            let song = await client.player.play(message.member.voice.channel, text, {})
            song = song.song
            embed
            .setTitle('Сейчас играет')
            .setDescription(`[${song.name}](${song.url}) [<@${RequestedBy}>]`)
            message.channel.send(embed)
            song.queue.on('songChanged', (oldSong, newSong, skipped, repeatMode, repeatQueue) => {
                if (repeatMode) {
                    message.channel.send(`Playing ${newSong.name} again...`);
                } else if(repeatQueue) {
                    message.channel.send(`Playing **${newSong.name}...**\nAdded **${oldSong.name}** to the end of the queue (repeatQueue).`);
                } else {
                    embed
                    .setDescription(`[${newSong.name}](${newSong.url}) [<@${newSong.requestedBy}>]`)
                    message.channel.send(embed)
                }
            })
        }
    }
}