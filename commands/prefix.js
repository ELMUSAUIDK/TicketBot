const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");
  if(!args[0] || args[0 == "help"]) return message.channel.send ("Usage: !prefix <desired prefix>"); // Make sure to set ! to their prefix

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if(err) console.log(err)
  });

  let prefixEmbed = new Discord.RichEmbed()
  .setTitle(`:tools: Prefix set to: ${args[0]}`)
  .setColor("#382NS8")
  .setFooter(`Set by ${message.author.username}`)
  .setTimestamp();

  message.channel.send(prefixEmbed);

}

module.exports.help = {
  name: "prefix"
}
