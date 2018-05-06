const Discord = require("discord.js");
const fs =  require("fs");

module.exports.noPerms = (message, perm) => {
  let embed = new Discord.RichEmbed()
  .setTitle(`No permission, ${message.author.username}`, true)
  .setDescription("Insufficient permission for that commmand!", true)
  .setColor("#42f4bc")
  .addField("Permission Needed:", perm, true);

  message.channel.send(embed).then(m => m.delete(5000));
}
