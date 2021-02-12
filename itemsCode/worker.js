const gagSchema = require("../schemas/gag-schema");

module.exports = async ({ message, args, text, client, prefix, instance, item }) => {
    const workers = require('./workers.json')
    let amount = Object.keys(workers).length
    function randomInteger(min, max) {
      // получить случайное число от (min-0.5) до (max+0.5)
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }
    let key = randomInteger(1, amount)
    message.reply('Ты взглянул на одного из своих рабочих.', {files: [workers[key]]})
}