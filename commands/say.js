const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

//!say Hi
  if(!message.member.hasPermission("MANAGE_SERVER")) return errors.noPerms(message, "MANAGE_SERVER");
  let botMessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botMessage);

  console.log(botMessage);
}

module.exports.help = {
  name: "say"
}
