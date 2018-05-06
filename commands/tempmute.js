const Discord = require("discord.js");
const config = require("../settings.json");
const ms = require("ms");
const errors = require("../utils/errors.js");

module.exports.run = async (bot,message,args) => {

  //!tempmute @user 1s/m/h/d


  // let modRole = config.modRoleName
  // let staffRole = message.guild.roles.find(`name`, modRole);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MEMBERS");
  let toMute = message.guild .member(message.mentions.users.first() || message.guild.members.get(args[0])); // GRABS USERNAME
  if(!toMute) return message.reply("Couldn't find user.");
  if(toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muteRole = message.guild.roles.find(`name`, "Muted");
  // start of create role
  if(!muteRole){
    try{
      muteRole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
let muteTime = args[1]; //SETS SECOND PIECE OF ARGUMENT AS muteTime
if(!muteTime) return message.reply("Please specify a time!"); // Makes sure they specify a timeout


let muteEmbed = new Discord.RichEmbed() // MODLOG EMBED
.setDescription("__**USER MUTED**__")
.setColor("#efb521")
.addField("User Muted", `${toMute}`, true)
.addField("Moderator", `${message.author}`, true)
.addField("Time of Mute", `${ms(ms(muteTime))}`, true)
.setFooter(`${message.createdAt}`);

let modChannel = message.guild.channels.find(`name`, config.logChannelName); //SETS LOG CHANNEL
if (!modChannel) return message.channel.send(`I cannot find the log channel!`);


message.delete().catch(O_o=>{}); //deletes command
await(toMute.addRole(muteRole.id));
message.channel.send(`${toMute} has been muted for ${ms(ms(muteTime))}`); // SENDS IN SAME CHAT--> CHANGE TO MODLOG CHAT
modChannel.send(muteEmbed);

setTimeout(function(){ // Timing section
  toMute.removeRole(muteRole.id);
  message.channel.send(`${toMute} has been unmuted.`); // lets them know they're unmuted
}, ms(muteTime));


// end of module
}

module.exports.help = {
  name: "tempmute"
}
