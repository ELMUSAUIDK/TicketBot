const Discord = require("discord.js");
const fs = require("fs");
const config = require("../settings.json");
// const ticketCount = require("./tickets.json");

let ticketCount = JSON.parse(fs.readFileSync("./ticketCount.json", "utf8"));

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // DO NOT RUN THIS PROGRAM USING NODEMON   DO NOT RUN THIS PROGRAM USING NODEMON   DO NOT RUN THIS PROGRAM USING NODEMON//
  // DO NOT RUN THIS PROGRAM USING NODEMON   DO NOT RUN THIS PROGRAM USING NODEMON   DO NOT RUN THIS PROGRAM USING NODEMON//
  // DO NOT RUN THIS PROGRAM USING NODEMON   DO NOT RUN THIS PROGRAM USING NODEMON   DO NOT RUN THIS PROGRAM USING NODEMON//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.run = async (bot, message, args) => { 

  switch(args[0]){
    case "new":
      let support = message.guild.roles.find(`name`, config.supportRoleName);
      if(!support){ // If "Support" DOES NOT exist, tell them to create it.
        message.channel.send(`Please specify a Support role in the settings`);
      } else { // If "Support" role exists, create ticket
        console.log(`Creating ticket for ${message.author.tag}...`);

        // message.delete();

        if(!ticketCount[message.guild.id]) ticketCount[message.guild.id]={ // If ticketCount doesn't exist FOR THAT GUILD, sets it to 0
          ticketCount: 0
        };

        ticketCount[message.guild.id].ticketCount++; // Adds 1 to ticketCount (will become 1 after first time)
        
        console.log(`${message.author.tag}'s ticket is ticket-${ticketCount[message.guild.id].ticketCount}`)

        let ticketChannel = message.guild.channels.find(`name`, "ticket-" + ticketCount[message.guild.id].ticketCount);
        let ticketReason = "Ticket was created by " + message.author.tag;
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
            .setDescription(`Hello <@${message.author.id}>, \n\nPlease sit tight while we find a Support representative to assist you.\n\nWhile waiting, you can tell us what you need help with! :thumbsup:`)
            .addField("Invite", "You can also invite your friend to this channel incase they're having the same problems. `!ticket invite @{your-friend}`")
            .setFooter(`Ticket created by ${message.author.tag}`)
            .setTimestamp();

           message.channel.send("ticket created - " + `<#${ticketChannel.id}>`);  // In original chat, sends "ticket created"
           if(!ticketChannel) return console.log("ticket doesn't exist..?");
           ticketChannel.send(newTicketEmbed);})

        await fs.writeFile("./ticketCount.json", JSON.stringify(ticketCount), err =>{ // Saves ticketCount to file.
          if (err) console.log(err)
        });

      }
      break;

    case "invite":
      let friend = message.guild .member(message.mentions.users.first()); // Sets "friend" as the first person mentioned
      if(!friend){
          message.channel.send("You must tag a friend for them to be added.");
        } else {
          if(message.channel.name.includes(`ticket`)) {
            message.channel.overwritePermissions(friend.id, {'VIEW_CHANNEL': true, 'SEND_MESSAGES':true}, "User was invited to this channel"); // Adds friend to ticket
  
            let addFriendEmbed = new Discord.RichEmbed()
            .setTitle("Friend Added")
            .setDescription(`<@${friend.id}> has been added to your ticket!`)
            .setFooter(`Added by ${message.author.tag}`)
            .setTimestamp();
  
            message.channel.send(addFriendEmbed);
            } else {
            message.channel.send("**This command may only be used in tickets.**");
            }
        }
      break;
    case "close":
      let channelName = message.channel.name;
      if(message.channel.name.includes(`ticket`)) {
        let modChannel = message.guild.channels.find(`name`, config.logChannelName);

        if(modChannel){
          let channelClosedEmbed = new Discord.RichEmbed()
          .setTitle("Ticket Closed")
          .setDescription(`\`${channelName}\` was closed by <@${message.author.id}>`)
          .setTimestamp();

          modChannel.send(channelClosedEmbed);
        }
        message.channel.delete(`Channel closed by: ${message.author.tag}`);
      } else {
        message.channel.send("**This command may only be used in tickets.**");
      }
      break;
    case "closeall":
      if(!message.member.hasPermission("MANAGE_GUILD" || "ADMINISTRATOR")) return message.channel.send("You don't have permissions for this command");
      message.guild.channels.forEach(async (channel, id) => {
        if(channel.name.startsWith("ticket-")) {
                await channel.delete("All tickets closed");
        }
      });
      console.log("Closeall command");
      break;

    case "help":
      let helpEmbed = new Discord.RichEmbed()
      .setTitle("Ticket Help :tickets:")
      .setColor(config.embedColor)
      .addField("New", "Creates a new ticket")
      .addField("Invite", "Once in your ticket, you can tag a friend to add them!")
      .addField("Close", "Closes or ends the ticket.")
      .setFooter(`Requested by ${message.author.tag}`);

      message.channel.send(helpEmbed);


      break;
    default:
      message.channel.send("Check out `!ticket help`");
      break;
  }

}
module.exports.help = {
  name: "ticket"
}
