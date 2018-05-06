const Discord = require("discord.js");
const fs = require("fs");
let config = require("../settings.json");

module.exports.noPerms = (message, perm) =>{
  let embed = new Discord.RichEmbed()
  .setTitle("NO PERMS")
  .addField("Insufficient Permission(s)", perm);

  message.channel.send(embed).then(m => m.delete(5000));
}
module.exports.noUser = (message) =>{
  message.channel.send("Please specify a user!").then(m => m.delete(10000));

}
module.exports.noChannel = (message) =>{
  message.channel.send("Please specify a channel!").then(m => m.delete(10000));

}

