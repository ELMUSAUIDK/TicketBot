const Discord = require("discord.js");
const fs =  require("fs");
const pay = require("../commands/pay.js")

module.exports.serverPay = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle(`Payment Message`, true)
  .setDescription("You have 1 due payment", true)
  .setColor("#42f4bc")
  .addField("Amount:", "$" + botmessage, true)
  .addField("For:", "Server Setup", true)
  .addField("User:", pUser, true)

  message.channel.send(embed);
}

module.exports.serverPayType = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle(`Payment Message`, true)
  .setDescription("You have 1 due payment", true)
  .setColor("#42f4bc")
  .addField("Amount:", "$" + pay.botmessage, true)
  .addField("For:", "Server Setup", true)
  .addField("User:", pay.pUser, true)
  .addField("Type:", pay.reason);

  message.channel.send(embed);
}
