const Discord = require("discord.js");
const config = require("../settings.json"); // SINGLE DOT MEANS "CURRENT FOLDER"; DOUBLE DOT MEANS "BACK 1 FOLDER"
const errors = require("../utils/errors.js");
const prefixes = require("../prefixes.json");

module.exports.run = async (bot, message, args) => {

  let prefix = prefixes[message.guild.id].prefixes;

  if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
  let banUser = message.guild .member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let banReason = args.slice(1).join(" ");

  let usageEmbed = new Discord.RichEmbed()
  .setTitle(`${prefix}Ban information`)
  .setDescription("Should be self explanatory, guild-only command")
  .addField("Usage", `${prefix}ban <user> <reason>`, true)
  .addField("Example", `${prefix}ban @empt loser`, true)
  .addField("Permissions", "`BAN_MEMBERS` permission OR " + `${config.modRoleName} role required`)
  .setFooter("<> and [] stand for <required> and [optional]")
  .setTimestamp();

  if(!args[0]) return message.channel.send(usageEmbed).then(msg => msg.delete(15000));

  //if(banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!"); Caused issues so removed.

  if(!banUser) return errors.noUser(message); // If ban user doesn't exist, notify them.
  if (!banReason) return message.channel.send("Please include a ban reason"); //If no reason exists, notify them

  let banEmbed = new Discord.RichEmbed()
  .setAuthor(`USER BANNED | ${banUser.username}`)
  .setColor("#f40909")
  .addField("User Banned", `${banUser}`, true)
  .addField("Moderator", `${message.author}`, true)
  .addField("Reason", `${banReason}`, true)
  .setFooter(`${message.createdAt}`)
  .setTimestamp();

  let modChannel = message.guild.channels.find(`name`, config.logChannelName);
  if (!modChannel) return message.channel.send(`I cannot find the log channel!`);

  message.delete().catch(O_o=>{});
  message.channel.send(`${banUser} has been banned! :hammer:`);
  banUser.ban(banReason);
  modChannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
