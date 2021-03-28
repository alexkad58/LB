module.exports = {
    callback: async ({ client, message }) => {
        if (client.player.isPlaying(message.guild.id)) return console.log(1)
        if (message.member.voice.channel) {
            console.log(2)
            message.member.voice.channel.join()
            .then(async connection => {
                connection.play(`audio/letmedie.mp3`);
            })
            message.channel.send('💀').then(msg => {
                setTimeout(() => {
                    i = 1000
                    setInterval(() => {
                        if (i < 7) return
                        msg.edit(`${i} - 7 = ${i - 7}`)
                        i = i -7
                    }, 1000)
                }, 1000 * 21)
            })
            
        }
    }
}