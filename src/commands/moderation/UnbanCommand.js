const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
     //Permission Checking:
     if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Who do you think You Are ?")
     if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have \`BAN_MEMBERS\` permission.")
 
     //Variables:
     let reason = args.slice(1).join(" ");
     let userID = args[0];
 
     //Input Checking
     if (!reason) reason = 'No Reason Given.';
     if (!args[0]) return message.channel.send('You must state someone to unban `\$unban ID reason\`');
     if (isNaN(args[0])) return message.channel.send('The ID stated is not a number.:rage: ||\`$unban ID reason\`||');
     
     //Executing:
     message.guild.fetchBans().then(async bans => {
       if (bans.size == 0) return message.channel.send('This server does not have anyone banned');
       let bUser = bans.find(b => b.user.id == userID);
       if (!bUser) return message.channel.send('The user ID does not match with anyone in the ban list :thinking:');
       await message.guild.members.unban(bUser.user, reason).catch(err => {
         console.Log(err);
         return message.channel.send('Something went wrong unbanning that User.');
       }).then(() => {
         message.channel.send(`Successfully Unbanned ${args[0]}`)
       });
     });  
   }
  }