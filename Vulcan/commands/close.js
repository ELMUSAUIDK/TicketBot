const Discord = require("discord.js");
const fs = require("fs");

let ticketCount = JSON.parse(fs.readFileSync("./ticketCount.json", "utf8"));

module.exports.run = async (bot, message, args) => {

let currentCount = "" + ticketCount[message.guild.id].ticketCount

  let ticketCategory = message.guild.channels.find(`name`, "Tickets");
  if(!message.channel.name.includes(`ticket-`)) {
    message.channel.send("This is not a ticket channel!");
} else {
    let embed = new Discord.RichEmbed()
    .setTitle(`Ticket - Closing`)
    .setColor("#7289DA")
    .setDescription("Closing your ticket!");
    //
    let logchannel = message.guild.channels.find(`name`, "logs");
    if(!logchannel) return message.channel.send(":x: Error: I couldn't find a log (#logs) channel. :x:");
    //
    message.channel.send(embed);

    let closedEmbed = new Discord.RichEmbed()
    .setTitle("Ticket Closed")
    .addField("User:", message.author.tag)
    .setColor("#7289DA")
    .addField("Ticket:", "#" + message.channel.name)
    .setTimestamp();

    logchannel.send(closedEmbed);
    console.log("Closing ticket #" + currentCount);
    message.channel.delete("Ticket has been closed!");
    console.log("Closed ticket #" + currentCount);

  }
}
module.exports.help = {
  name: "close"
}
