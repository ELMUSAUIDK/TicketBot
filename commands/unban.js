const Discord = require("discord.js");
const config = require("../settings.json"); // SINGLE DOT MEANS "CURRENT FOLDER"; DOUBLE DOT MEANS "BACK 1 FOLDER"
const errors = require("../utils/errors.js");
const prefixes = require("../prefixes.json");

module.exports.run = async (bot, message, args) => {

    let prefix = prefixes[message.guild.id].prefixes;

    // if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    // let unbanUserName = message.guild .member(message.mentions.users.first() || message.guild.members.get(args[0]));

    // let unbanUser = message.guild.fetchMembers(unbanUserName, 1);

    // let usageEmbed = new Discord.RichEmbed()
    // .setTitle(`${prefix}Unban information`)
    // .setDescription("Should be self explanatory, guild-only command")
    // .addField("Usage", `${prefix}Unban <user>`, true)
    // .addField("Example", `${prefix}Unban @empt`, true)
    // .addField("Permissions", "`BAN_MEMBERS` permission OR " + `${config.modRoleName} role required`)
    // .setFooter("<> and [] stand for <required> and [optional]")
    // .setTimestamp();
  
    // if(!args[0]) return message.channel.send(usageEmbed).then(msg => msg.delete(15000));

    message.guild.fetchBans().then(console.log);

    // let unbanEmbed = new Discord.RichEmbed()
    // .setAuthor(`USER UNBANNED |` + unbanUser.tag)
    // .setColor("#f40909")
    // .addField("User Banned", `${unbanUser}`, true)
    // .addField("Moderator", `${message.author}`, true)
    // .setFooter(`${message.createdAt}`)
    // .setTimestamp();

    // let modChannel = message.guild.channels.find(`name`, config.logChannelName);
    // if (!modChannel) return message.channel.send(`I cannot find the log channel!`);
  

    // message.channel.send(`${unbanUser} has been unbanned!`);
    // unbanUser.unban();
    // modChannel.send(unbanEmbed);
}

module.exports.help = {
    name: "unban"
}
  