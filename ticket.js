const Discord = require("discord.js");
const fs = require("fs");

let ticketCount = JSON.parse(fs.readFileSync("./ticketCount.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  switch(args[0]){
    case "create":
      let support = message.guild.roles.find(`name`, "Support");
      if(!support){ // If "Support" DOES NOT exist, tell them to create it.
        message.channel.send("Create a role named `Support`");
      } else { // If "Support" role exists, create ticket
        console.log("Creating ticket...");

        if(!ticketCount[message.guild.id]) ticketCount[message.guild.id]={ // If message.guild Ticket count doesn't exist, sets it to 0
          ticketCount: 0
        };

        ticketCount[message.guild.id].ticketCount++;

        let ticketChannel = message.guild.channels.find(`name`, "ticket-" + ticketCount[message.guild.id].ticketCount);
        let ticketReason = "Ticket was created by " + message.author.id;
        message.guild.createChannel("ticket-" + ticketCount[message.guild.id].ticketCount, `text`, [ // Creates the ticket
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
            let ticketChannel = message.guild.channels.find(`name`, "ticket-" + ticketCount[message.guild.id].ticketCount);

            let newTicketEmbed = new Discord.RichEmbed()
            .setTitle("Ticket")
            .setColor("#7289DA")
            .setDescription(`Hello <@${message.author.id}>, \n\n Please sit tight while we find a Support representative to assist you.\n\n While waiting, you can tell us what you need help with! :thumbsup:`);

           message.channel.send("ticket created - " + ticketCount[message.guild.id].ticketCount);  // In original chat, sends "ticket created"
           if(!ticketChannel) return console.log("ticket doesn't exist..?");
           ticketChannel.send(newTicketEmbed);})






        await fs.writeFile("./ticketCount.json", JSON.stringify(ticketCount), err =>{
          if (err) console.log(err)
        });

      }




    case "close":
      console.log("close works");
      break;
    default:
      console.log("no idea if this works");
  }

}
module.exports.help = {
  name: "ticket"
}
