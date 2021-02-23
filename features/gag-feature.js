const mongo = require('../mongo')
const gagSchema = require('../schemas/gag-schema')
const gagcountSchema = require('../schemas/gagcount-schema')
const volumeSchema = require('../schemas/volume-schema')

module.exports = (client, instance) => {
  client.on('voiceStateUpdate', async (oldMember, newMember)=> {
    const cache = {}
    if(oldMember.selfMute == true && newMember.selfMute == false) {
        if (client.player.isPlaying(newMember.guild.id) === true) {
            return
        }
        let data = cache[newMember.id]
 
            await mongo().then(async mongoose => {
                try {
                    const result = await gagSchema.findOne({ _id: newMember.id })
                    if(!result) {
                        return
                    }
                    cache[newMember.id] = data = [result.text, result.count]
                    
                } finally {
                    
                }
            })
        
        if (!data) {
            return
        } 
        const text = data[0]
        await mongo().then(async mongoose => {
            try {
                const gresult = await gagcountSchema.findOne({ _id: text })
                if(!gresult) {
                   return
                }
                gcount = gresult.count
                
            } finally {
                
            }
        }) 
        data[1]++
        gcount++
        const vlm = await volumeSchema.findOneAndUpdate({_id:newMember.guild.id})
        let volume = Number(vlm.volume)

        if (newMember.channel && text !== 'выкл' && text !== null) {
            let isOn = false
            newMember.channel.join()
            .then(async connection => {
                const vlm = await volumeSchema.findOneAndUpdate({_id:newMember.guild.id})
                connection.play(`audio/${text}.mp3`,{volume: Number(vlm.volume),});
            });
            await mongo().then(async mongoose => {
                try {
                    await gagSchema.findOneAndUpdate(
                    {
                        _id: newMember.id
                    }, 
                    {
                        count: data[1]
                    }
                    , 
                    {
                        upsert: true
                    }
                    )
                } finally {
                    
                }
            })
            await mongo().then(async mongoose => {
                try {
                    await gagcountSchema.findOneAndUpdate(
                    {
                        _id: text
                    }, 
                    {
                        count: gcount
                    }
                    , 
                    {
                        upsert: true
                    }
                    )
                } finally {
                    
                }
            })
            
            const mainGuild = client.guilds.cache.get('579709976029691905')
            const logChannel = mainGuild.channels.cache.get('807116096586252289')
            const logMessage = `>${newMember.member.user.username}(${newMember.member.nickname}) использовал прикол "${text}"`
            logChannel.send(logMessage)
        }
    }
})
}

module.exports.config = {
  displayName: 'Gag feature', // Can be changed any time
  dbName: 'GAG_FEATURE', // Should be unique and NEVER be changed once set
  loadDBFirst: true, // Wait for the database connection to be present
}