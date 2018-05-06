const Discord = require("discord.js");
const fs = require("fs");

let ticketCount = JSON.parse(fs.readFileSync("./ticketCount.json", "utf8"));

module.exports.run = async (bot, message, args) => {

      let openReason = args.join(" ");
      if(!openReason) {
        return message.channel.send("Please provide a reason for opening your ticket!");
      }
      let support = message.guild.roles.find(`name`, "Support");
      if(!support){ // If "Support" DOES NOT exist, tell them to create it.
        message.channel.send("Create a role named `Support`");
        console.log("[Error] 'Support' role not found!")
      } else { // If "Support" role exists, create ticket

        if(!ticketCount[message.guild.id]) ticketCount[message.guild.id]={ // If message.guild Ticket count doesn't exist, sets it to 0
          ticketCount: 1
        };

        ticketCount[message.guild.id].ticketCount++;

          let currentCount = "" + ticketCount[message.guild.id].ticketCount

        console.log("[Helper] Creating ticket #" + currentCount);
        let ticketCategory = message.guild.channels.find(`name`, "Tickets");
        let ticketReason = "Ticket was created by " + message.author.tag;
        message.guild.createChannel("ticket-" + currentCount, `text`, [ // Creates the ticket
            {
              id: message.guild.id,
              deny: ['VIEW_CHANNEL', 'MANAGE_MESSAGES']
            },
            {
              id: support.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES']

            },
            {
              id: message.author.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
        ], ticketReason).then(channel => {
          //
          let logchannel = message.guild.channels.find(`name`, "logs");
          if(!logchannel) return message.channel.send(":x: Error: I couldn't find a log (#logs) channel. :x:");
          //

          console.log("[Helper] Created ticket #" + currentCount);
            let ticketChannel = message.guild.channels.find(`name`, "ticket-" + currentCount);
            ticketChannel.setParent(ticketCategory.id);
            let newTicketEmbed = new Discord.RichEmbed()
            .setTitle("Ticket - " + message.author.tag)
            .addField("Reason", "Invoice - " + openReason)
            .setColor("#7289DA")
            .setDescription(`Hello <@${message.author.id}>, \n\nThank you for creating a ticket!\n\nWe'll be with you in a few minutes. While you're waiting, please give us some information on your inquire. :thumbsup:`);

//
let openedEmbed = new Discord.RichEmbed()
.setTitle("Ticket Opened")
.addField("User:", message.author.tag)
.setColor("#7289DA")
.addField("Ticket:", "#" + ticketChannel.name)
.setTimestamp();

logchannel.send(openedEmbed);
//

           message.channel.send(`Your ticket has been created, <@${message.author.id}> -> <#${ticketChannel.id}>`);  // In original chat, sends "ticket created"
           if(!ticketChannel) return console.log("[Error] Ticket doesn't exist!");
           ticketChannel.send(newTicketEmbed);
         })

        await fs.writeFile("./ticketCount.json", JSON.stringify(ticketCount), err =>{
          if (err) console.log(err)
        });

      }

}
module.exports.help = {
  name: "new"
}
