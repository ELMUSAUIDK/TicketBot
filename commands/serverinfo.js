const Discord = require("discord.js");
const config = require("../settings.json");

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setTitle("Server Information", sicon)
  .setColor(config.colorGold)
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name, true)
  .addField("Server ID", message.guild.id, true)
  .addField("Owner", message.guild.owner, true)
  .addField("Region", message.guild.region, true)
  .addField("Channels", message.guild.channels, true)
  .addField("Members", message.guild.memberCount, true)
  .addField("You Joined", message.member.joinedAt, true)
  .addField("Roles", message.guild.roles, true)
  .addField("Role List", message.guild.roles)
  .setFooter("Server Created");

  message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverinfo"
}
