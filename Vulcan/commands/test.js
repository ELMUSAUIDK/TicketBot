const Discord = require("discord.js");
const auth = require("../utils/auth.json");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  if(message.channel.name !="support" && message.channel.name != "bot-test") {
    message.delete();
    message.channel.send("Commands only work in <#429857972630585347>, " + message.author).then(m => m.delete(5000));
    return;
  }
  let ticketCategory = message.guild.channels.find(`name`, "Tickets");
  if(!ticketCategory) {
    let noCategory = new Discord.RichEmbed()
    .setTitle("Error")
    .addField("Missing Category:", "Tickets")
    .setFooter(auth.footer);

    console.log("[Missing] 'Tickets' category!")
    logchannel.send(noCategory);
  } else {
    let support = message.guild.roles.find(`name`, "Support");
    if(!support) {
      message.channel.send("Please create a role called 'Support'");
      console.log("Error: 'Support' role not found!");
    } else {
      let ticketReason = `A support ticket opened by ` + message.author.tag;
      let currentTime = moment().unix();
      message.guild.createChannel("ticket-" + 1, `text`,
         [{
           id: message.guild.id,
           deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
           },
           {
           id: message.author.id,
           allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
           },
           {
           id: support.id,
           allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
           }
       ], ticketReason);
    } message.channel.setParent(ticketCategory.id).then(chan => {

      let newTicketEmbed = new Discord.RichEmbed()
      .setTitle(`Ticket - ${message.author.tag}`)
      .setDescription("Thank you for creating a ticket! We'll be with you in a few minutes. While you're waiting, please give us some information on your inquire.")
      .setTimestamp()
      .setFooter(auth.footer);

      chan.send(newTicketEmbed);
      chan.send("<@&429856344007376914> | New ticket!");

      let createTicketEmbed = new Discord.RichEmbed()
      .setTitle("Tickets")
      .setDescription("Ticket opened for " + `${message.author.tag}`)
      .addField("Channel", )
      .setTimestamp()
      .setFooter(auth.footer);

      let logchannel = message.guild.channels.find(`name`, "logs");
      if (!logchannel) {
        message.channel.send("Couldn't find a log channel!");
      } else {
        logchannel.send(createTicketEmbed);
        console.log(ticketCategory.id)
      }
    })
  }
}
module.exports.help = {
  name: "new"
}
