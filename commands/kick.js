const Discord = require("discord.js");
const config = require("../settings.json");
const errors = require("../utils/errors.js");
const prefixes = require("../prefixes.json");

module.exports.run = async (bot, message, args) => {

  let prefix = prefixes[message.guild.id].prefixes;

  if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
  let kickUser = message.guild .member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let kickReason = args.slice(1).join(" ");

  let usageEmbed = new Discord.RichEmbed()
    .setTitle(`${prefix}Kick information`)
    .setDescription("Should be self explanatory, guild-only command")
    .addField("Usage", `${prefix}kick <user> [reason]`, true)
    .addField("Example", `${prefix}kick @empt loser`, true)
    .addField("Permissions", "`KICK_MEMBERS` permission OR " + `${config.modRoleName} role required`)
    .setFooter("<> and [] stand for <required> and [optional]")
    .setTimestamp();

  if(!args[0]) return message.channel.send(usageEmbed).then(msg => msg.delete(15000));

  if(!kickUser) return errors.noUser(message);

  let kickEmbed = new Discord.RichEmbed()
  .setAuthor(`USER KICKED | ${kickUser}`)
  .setColor("#efb521")
  .addField("User Kicked", `${kickUser}`, true)
  .addField("Moderator", `${message.author}`, true)
  .addField("Reason", kickReason || "Not Specified", true)
  .setFooter(`ID: ${kickUser.id}`)
  .setTimestamp();

  let modChannel = message.guild.channels.find(`name`, config.logChannelName);
  if (!modChannel) return message.channel.send(`I cannot find the log channel!`);


  message.delete().catch(O_o=>{});
  message.channel.send(`${kickUser} has been kicked! :boot:`);
  kickUser.kick(kickReason);
  modChannel.send(kickEmbed);
}

module.exports.help = {
  name: "kick"
}
