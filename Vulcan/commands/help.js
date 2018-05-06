const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let embed1 = new Discord.RichEmbed()
  .addField("Help:", "If a command has <> in it. That means that is an optional argument.")
  .setColor("#34e8dd");

message.channel.send(embed1).then(() => {
  message.react("440176904646164501");
});
  let embed2 = new Discord.RichEmbed()
  .setTitle("General Commands:")
  .addField("!new", "Opens a support ticket.")
  .addField("!close", "Closes your support ticket.")
  .addField("!add <user>", "Adds users from your support ticket.")
  .addField("!remove <user>", "Removes users from your support ticket.")
  .addField("!8ball <question>", "The mysterious 8ball.")
  .addField("!hex", "Gives you a random hex code.")
  .setColor("#34e8dd")
  .setTimestamp()
  .setFooter("Requested by " + message.author.tag);


  let friendRole = message.guild.roles.find("name", "Friends");
  let adminRole = message.guild.roles.find("name", "Admin");

  let embed3 = new Discord.RichEmbed()
  .setTitle("Friend Commands:")
  .addField("!fkoff <user>", "Tell someone to fuck off.")
  .setColor("#34e8dd")
  .setTimestamp()
  .setFooter("Requested by " + message.author.tag);

  let embed4 = new Discord.RichEmbed()
  .setTitle("Admin Commands:")
  .addField("!ban <user> <reason>", "Bans a user for a reason.")
  .addField("!clear <# of messages>", "Clears an amount of messages.")
  .addField("!friend <user>", "Set's friend role.")
  .addField("!pay <user> <type> <amount>", "Sends a payment notification.")
  .addField("!tempmute <user> <reason>", "Temporarily mutes a user for a reason.")
  .addField("!warn <user> <reason>", "Gives a user a warning.")
  .addField("!warnings <user>", "Lists warnings for a user.")
  .setColor("#34e8dd")
  .setTimestamp()
  .setFooter("Requested by " + message.author.tag);

  if (message.member.roles.has(adminRole.id)) {
    message.author.send(embed1);
    message.author.send(embed2);
    message.author.send(embed3);
    message.author.send(embed4);
  } else if (message.member.roles.has(friendRole.id)) {
    message.author.send(embed1);
    message.author.send(embed2);
    message.author.send(embed3)
  } else {
    message.author.send(embed1);
    message.author.send(embed2);
  }


}

module.exports.help = {
    name: "help"
}
