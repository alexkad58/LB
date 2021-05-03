
module.exports = (client, instance) => {
  client.on('voiceStateUpdate', async (oldMember, newMember)=> {
    return
    const cache = {}
    const users = ['378767972207951883','298137115877965844']
    if(!oldMember.channelID && newMember.channelID) {

        
        if (newMember.channel) {
            newMember.channel.join()
            .then(async connection => {
                connection.play(`audio/agh.mp3`, { volume: 1});
            });
            
            
        }
    }
})
}
