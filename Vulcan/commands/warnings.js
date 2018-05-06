const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utils/errors.js");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply(":x: Error: User not found! :x:");
  let warning = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> has ${warning} warnings.`);

}

module.exports.help = {
  name: "warnings"
}
