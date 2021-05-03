
module.exports = (client, instance) => {
  client.on('voiceStateUpdate', async (oldMember, newMember)=> {

    const users = ['378767972207951883','298137115877965844']
    if(!oldMember.channelID && newMember.channelID) {

        let b = false 

        users.forEach(e => {
            if (e == newMember.member.id) b = true
        })

        if (newMember.channel && b) {
            newMember.channel.join()
            .then(async connection => {
                connection.play(`audio/agh.mp3`, { volume: 1});
            });
            
            
        }
    }
})
}
