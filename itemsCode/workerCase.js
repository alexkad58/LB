const gagSchema = require("../schemas/gag-schema");
const mongo = require("../mongo")

module.exports = async ({ message, args, text, client, prefix, instance, item }) => {
    const workers = require('./workers.json')
    const getRandomTier = () => {
      ran = Math.random() * 100;
      if (ran < 30) return 5
      if (ran < 55) return 4
      if (ran < 75) return 3
      if (ran < 90) return 2
      return 1
    }
    
    let key = getRandomTier()
    const reqItem = `workerTier${key}`
      const itemName = workers[reqItem].name
      const itemImg = workers[reqItem].img
      await mongo().then(async mongoose => {
          try {  
              const result = await gagSchema.findOne({_id: message.author.id})
              if (!result) {
                  return
              }
                  message.reply(`Тебе выпал "**${itemName}**"`, {files: [itemImg]})
                  if (!result.inventory) {
                      result.inventory = {}
                  } 
                  if (!result.inventory[`${reqItem}`]) {
                      result.inventory[`${reqItem}`] = 1
                      result.inventory.workerCase = result.inventory.workerCase - 1
                  } else {
                      result.inventory[`${reqItem}`] = result.inventory[`${reqItem}`] + 1
                      result.inventory.workerCase = result.inventory.workerCase - 1
                  }      
                  await gagSchema.findOneAndUpdate({_id: message.author.id}, {
                      _id: message.author.id,
                      inventory: result.inventory
                  },{upsert: true})
              
          } finally {
          }
      })
      
}