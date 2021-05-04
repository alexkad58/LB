
module.exports = (client, instance) => {
  client.on('voiceStateUpdate', async (oldMember, newMember)=> {

    const users = ['0','0']
    if(!oldMember.channelID && newMember.channelID) {

        let b = false 

        users.forEach(e => {
            if (e == newMember.member.id) b = true
        })

        if (newMember.channel && b) {
            newMember.channel.join()
            .then(async connection => {
                setInterval(() => {
                    connection.play(`audio/agh.mp3`, { volume: 1});
                }, 4000)
                
            });
            
            
        }
    }
})
}
