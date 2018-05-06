// const Discord = require("discord.js");
// const auth = require("../utils/auth.json");

// module.exports.run = async (bot, message, args) => {
//   if(message.channel.name !="support" && message.channel.name != "bot-test") {
//     message.delete();
//     message.channel.send("Commands only work in <#429857972630585347>, " + message.author).then(m => m.delete(5000));
//     return;
//   }
//   let ticketCategory = message.guild.channels.find(`name`, "Tickets");
//   if(!ticketCategory) {
//     let noCategory = new Discord.RichEmbed()
//     .setTitle("Error")
//     .addField("Missing Category:", "Tickets")
//     .setFooter(auth.footer);
//   } else {
//     let support = message.guild.roles.find(`name`, "Support");
//     if(!support) {
//       message.channel.send("Please create a role called 'Support'");
//       console.log("Error: 'Support' role not found!");
//     } else {
//       let currentTime = moment().unix();
//       message.guild.channels.create("ticket-" + `${currentTime}`), {
//         type: `text`,
//         overwrites: [{
//           id: message.guild.id,
//           denied: ['VIEW_CHANNEL', 'SEND_MESSAGES']
//         },
//         {
//           id: message.author.id,
//           allowed: ['VIEW_CHANNEL', 'SEND_MESSAGES']
//         },
//         {
//           id: support.id,
//           allowed: ['VIEW_CHANNEL', 'SEND_MESSAGES']
//         },
//     ],
//       parent: ticketCategory.id,
//       reason: `Ticket channel created by ${message.author.tag}`
//       }
//     }(channel => {
//       let createTicketEmbed = new Discord.RichEmbed()
//       .setTitle("Tickets")
//       .setDescription("Ticket opened for " + `${message.author.tag}`)
//       .setTimestamp()
//       .setFooter(auth.footer);

//       let logchannel = message.guild.channels.find(`name`, "logs");
//       if (!logchannel) {
//         message.channel.send("Couldn't find a log channel!");
//       } else {
//         logchannel.send(createTicketEmbed);
//       }
//       let newTicketEmbed = new Discord.RichEmbed()
//       .setTitle("Ticket")
//       .setDescription("Thank you for creating a ticket! We'll be with you in a few minutes. While you're waiting, please give us some information on your inquire.")
//       .setTimestamp()
//       .setFooter(auth.footer);

//       channel.send(newTicketEmbed);
//       cnl.send("<@&429856344007376914> | New ticket!");
//     })
//   }
// }
module.exports.help = {
  name: "new"
}