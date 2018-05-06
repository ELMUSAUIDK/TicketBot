const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MEMBERS");
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) message.channel.send(":x: Error: I couldn't find that user :x:");
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: You may not kick that person :x:");

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("--- Kicked ---")
    .setDescription("A user was kicked!")
    .setColor("#42f4bc")
    .addField("User:", `${kUser}`, true)
    .addField("By:", `${message.author}`, true)
    .addField("Channel:", message.channel, true)
    .addField("Reason:", kReason, true)
    .setFooter("Bot created by Court#6732");



    let logchannel = message.guild.channels.find(`name`, "logs");
    if(!logchannel) return message.channel.send(":x: Error: I couldn't find a log (#logs) channel. :x:");

    message.delete().catch(O_o=>{});
    message.channel.send("User has been kicked!")
    kUser.send(`You were kicked from ${message.guild.name} by ${message.author} for **${kReason}**`)
    message.guild.member(kUser).kick(kReason);
    
}

module.exports.help = {
    name: "kick"
}
// EMGcFgN
