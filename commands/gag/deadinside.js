module.exports = {
    callback: async ({ message }) => {
        if (client.player.isPlaying(message.guild.id)) return
        if (message.member.voice.channel) {
            message.member.voice.channel.join()
            .then(async connection => {
                connection.play(`audio/letmedie.mp3`);
            })
            msg = message.channel.send('💀')
            setTimeout(() => {
                for (i = 1000; i >0; i--) {
                    msg.edit(`${i} - 7 = ${i - 7}`)
                }
            }, 1000 * 21)
        }
    }
}