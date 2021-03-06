const Discord = require("discord.js");
const errors = require("../utils/errors.js");


module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.channel.send('Please specify a number');
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages :bomb:`).then(msg => msg.delete(5000)).then(msg => msg.react('💣'));
  });

}

module.exports.help = {
  name: "purge"
}
