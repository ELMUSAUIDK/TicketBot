const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    if(!bUser) message.channel.send(":x: Error: I couldn't find that user :x:");
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: You may not ban that person :x:");

    let banEmbed = new Discord.RichEmbed()
    .setTitle("--- Banned ---")
    .setDescription("A user was banned!")
    .setColor("#42f4bc")
    .addField("Banned User", `${bUser} with ID: ${bUser.id}`, true)
    .addField("Banned By", `${message.author} with ID: ${message.author.id}`, true)
    .addField("In Channel", message.channel)
    .addField("Reason", bReason)
    .setFooter("Bot created by Court#6732");

    let logchannel = message.guild.channels.find(`name`, "logs");
    if(!logchannel) return message.channel.send(":x: Error: I couldn't find a log (#logs) channel. :x:");

    message.guild.member(bUser).ban(bReason);
    logchannel.send(banEmbed);
}

module.exports.help = {
    name: "ban"
}
