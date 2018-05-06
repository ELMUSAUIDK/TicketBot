const Discord = require("discord.js");
const config = require("../settings.json");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  let reportUser = message.guild .member(message.mentions.users.first());
  if(!reportUser) return errors.noUser(message);
  let reportReason = args.slice(1).join(" ");

  let reportEmbed = new Discord.RichEmbed()
  .setAuthor(`USER REPORT | ${reportUser.tag}`)
  .setColor("#2c69cc")
  .addField("Reported User", `${reportUser}`, true)
  .addField("Reported By", `${message.author}`, true)
  .addField("Reason", reportReason, true)
  .setFooter(`ID: ${reportUser.id}`)
  .setTimestamp();

  let modChannel = message.guild.channels.find(`name`, config.logChannelName);
  if(!modChannel) return message.channel.send("Couldn't find reports channel.");

  message.delete().catch(O_o=>{}); //deletes the command sent
  message.channel.send("Report has been submitted! :clipboard:");
  modChannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"
}
