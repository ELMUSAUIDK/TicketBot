const Discord = require("discord.js");
const config = require("../settings.json");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setTitle("Bot Info")
  .setColor(config.colorGold)
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username, true)
  .addField("Creator", config.creator, true)
  .addField("Default Prefix", config.prefix, true)
  .setTimestamp()
  .setFooter("DM Alf for any support");

  return message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}
