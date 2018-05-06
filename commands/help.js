const Discord = require("discord.js");
const botSettings = require("../settings.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    let helpEmbed = new Discord.RichEmbed()
    .setTitle("Bot Commands")
    .setColor("#e8d01b")
    .setDescription("Prefix: " + botSettings.prefix)
    .addField("Help", botSettings.prefix + "help")
    .addField("Report", botSettings.prefix + "report <user> <reason>")
    .addField("Server Info", botSettings.prefix + "serverinfo")
    .addField("Bot Info", botSettings.prefix + "botinfo")
    .setFooter("Made by Alf Alfa#8298")
    .setTimestamp();
  
    let staffEmbed = new Discord.RichEmbed()
    .setTitle("Bot Commands | Staff Access")
    .setColor("#e8d01b")
    .addField("Kick", botSettings.prefix + "kick <user> <reason>")
    .addField("Ban", botSettings.prefix + "ban <user> <reason>")
    .addField("Warn", botSettings.prefix + "warn <user> <reason>")
    .addField("Temp Mute", botSettings.prefix + "tempmute <user> <time>")
    .addField("Role", botSettings.prefix + "role <user> <role>")
    .addField("Prefix", botSettings.prefix + "prefix <set prefix>")
    .addField("Purge", botSettings.prefix + "purge <number>")
    .addField("Say", botSettings.prefix + "say <message>")
    .setFooter("Made by Alf Alfa#8298")
    .setTimestamp();

    //message.delete().catch(O_o=>{}); Deletes !help command
    message.channel.send(helpEmbed);
    message.channel.send(staffEmbed);//.then(msg => msg.delete(15000)); Removed - automatically would delete message

    };

module.exports.help = {
  name: "help"
}
