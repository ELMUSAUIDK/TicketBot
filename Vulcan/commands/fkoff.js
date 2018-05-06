const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (message.channel.name != "friend-chat" && message.channel.name != "bot-test") {
    message.delete();
    message.channel.send("Commands only work in <#429857972630585347>, " + message.author).then(m => m.delete(5000));
    return;
  }
let rude = message.member
let retard = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!retard) return message.channel.send("Specify a user? !fkoff <user>");
let friendRole = message.guild.roles.find("name", "Friends");

let reply = "ok.. i'll tell them, " + rude;
let stupid = rude + " wants you to fuck off, " + retard;
if(rude.roles.has(friendRole.id)) {
  message.channel.send(reply).then(m => m.channel.send(stupid));
} else {
  message.reply("No permission");
}




}


module.exports.help = {
    name: "fkoff"
}
