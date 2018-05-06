const Discord = require("discord.js");
const tokenfile = require("./token.json");
const botSettings = require("./settings.json");
const modChannel = require("./settings.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
let cooldown = new Set();
let cdseconds = botSettings.cooldown;


bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`); // LOADS EVERY COMMAND 
      bot.commands.set(props.help.name, props);
  });

}); // Adds Command handler (commands folder)

bot.on("ready",  async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`my failures`,{type: "WATCHING"});
  console.log("#############");
  console.log("BOT LOADED");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8")); // Sets prefixes to the prefixes.json file

  if(!prefixes[message.guild.id]){ // if prefix doesn't exist for guild
    prefixes[message.guild.id] = { //Then set the prefix of the guild
      prefixes: botSettings.prefix // To botSettings.prefix (!)
      };    
  };
 

  let prefix = prefixes[message.guild.id].prefixes; // let prefix = the prefix in the json file
  if(!message.content.startsWith(prefix)) return; //If cmd doesn't start with the SERVER SET PREFIX, return.
  // if(cooldown.has(message.author.id)){
  //   message.delete();
  //   return message.reply(`You have to wait ${cdseconds} seconds between commands.`)
  // }
  // if(!message.member.hasPermission("ADMINISTRATOR") || !message.member.roles.has(botSettings.modRoleName)){
  //   cooldown.add(message.author.id);
  // }

  //let prefix = botSettings.prefix; - Removed to allow custom server prefixes
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args); // Runs command if it's found.

  // setTimeout(() => {
  //   cooldown.delete(message.author.id)
  // }, cdseconds * 1000)


});

bot.login(tokenfile.token);
