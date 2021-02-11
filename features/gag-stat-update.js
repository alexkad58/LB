const mongo = require('../mongo')
const Discord = require('discord.js')
const gagSchema = require('../schemas/gag-schema')
const gagcountSchema = require('../schemas/gagcount-schema')


const GC1 = async (client) => {
    
    const guild = client.guilds.cache.get('579709976029691905')
    const channel = guild.channels.cache.get('795798533272895548')
     
    await mongo().then(async mongoose => {
        try {
            const table1 = '795810632540618793'
            channel.messages.fetch({around: table1, limit: 1})
            .then(msg => {
                    const tableMessage1 = msg.first()
                    const fetchTable1 = async () => {
                        const results1 = await gagSchema.find({
                        }).sort({
                            count: -1
                        }).limit(
                            3
                        )
                    users = [1, 2, 3]
                    let i = 0
                    while (i < 3) { 
                        if(guild.members.cache.get(results1[i]._id).nickname === null) {
                            users[i] = guild.members.cache.get(results1[i]._id).user.username
                        } else {
                            users[i] = guild.members.cache.get(results1[i]._id).nickname
                        }
                        i++
                    }

                    const last = nb => {
                        const ld = nb % 10;
                        if(ld == 1) {
                            var lr = ''
                        } else {
                        if(ld<5 && ld!=0){
                            var lr = 'а'
                        } else {
                            var lr = 'ов'
                        }
                        } return lr
                    }
                    const embed1 = new Discord.MessageEmbed()
                    .setTitle('Лучшие приколисты')
                    .setColor('#FF5733')
                    .addFields(
                        {
                            name: `${users[0]}`,
                            value: `${results1[0].count} прикол${last(results1[0].count)}`,
                            inline: true,
                        },
                        {
                            name: `${users[1]}`,
                            value: `${results1[1].count} прикол${last(results1[1].count)}`,
                            inline: true,
                        },
                        {
                            name: `${users[2]}`,
                            value: `${results1[2].count} прикол${last(results1[2].count)}`,
                            inline: true,
                        },
                    )
                    tableMessage1.edit(embed1)    
                    }
                fetchTable1()
            })
            }
            catch (e) {
                console.log(e);
            }
            finally {
            
        }
    })
    
    setTimeout(() => {
        GC1(client)
     }, 1000 * 60)

}

const GC2 = async (client) => {
    
    const guild = client.guilds.cache.get('579709976029691905')
    const channel = guild.channels.cache.get('795798533272895548')
    
    await mongo().then(async mongoose => {
        try { 
            const table2 = '795810917706629150'
            channel.messages.fetch({around: table2, limit: 1})
            .then(async msg => {
                    const tableMessage2 = msg.first()
                    const fetchTable2 = async() => {
                        const results2 = await gagcountSchema.find({
                        }).sort({
                            count: -1
                        }).limit(3)
                        const last = nb => {
                            const ld = nb % 10;
                            if(ld == 1) {
                                var lr = ''
                            } else {
                            if(ld<5 && ld!=0){
                                var lr = 'а'
                            } else {
                                var lr = ''
                            }
                            } return lr
                        }
                        const embed2 = new Discord.MessageEmbed()
                        .setTitle('Лучшие приколы')
                        .setColor('#FF5733')
                        .addFields(
                            {
                                name: `${results2[0]._id}`,
                                value: `${results2[0].count} раз${last(results2[0].count)}`,
                                inline: true,
                            },
                            {
                                name: `${results2[1]._id}`,
                                value: `${results2[1].count} раз${last(results2[1].count)}`,
                                inline: true,
                            },
                            {
                                name: `${results2[2]._id}`,
                                value: `${results2[2].count} раз${last(results2[2].count)}`,
                                inline: true,
                            },
                        )
                        tableMessage2.edit(embed2)
                    }          
                fetchTable2()
            })      
            }
            catch (e) {
                console.log(e);
            } 
            finally {
               
        }
    })
    
    setTimeout(() => {
        GC2(client)
     }, 1000 * 60)

}

module.exports = (client, instance) => {
    GC1(client)
    GC2(client)
  }
  
  module.exports.config = {
    displayName: 'Gag stat update', // Can be changed any time
    dbName: 'GAG_STAT_UPDATE', // Should be unique and NEVER be changed once set
    loadDBFirst: true, // Wait for the database connection to be present
  }