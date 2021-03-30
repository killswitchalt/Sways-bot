const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
        //Permission Checking:
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Who do you think You Are ?")
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I do not have \`KICK_MEMBERS\` permission.")
    
        //variables:
        let reason = args.slice(1).join(" ");
        const mentionedMember = message.mentions.members.first();
    
        //Input Checking
        if (!reason) reason = 'No Reason Given.';
        if (!args[0]) return message.channel.send('You must state someone to ban \`-sr kick @user reason\`');
        if (!mentionedMember) return message.channel.send('The member mentioned is not in the server. <:1:797814167805100032>');
        if (!mentionedMember.bannable) return message.channel.send('I cannot kick that user. :cry:');
    
        //Executing:
        const kickEmbed = new Discord.MessageEmbed()
        .setTitle(`You Have Been Kicked from ${message.guild.name}`)
        .setDescription(`Reasonn For Being Kicked: ${reason}`)
        .setColor("#5708ab")
        .setTimestamp();
    
      await mentionedMember.send(kickEmbed).catch(err => console.log(err));
      await mentionedMember.kick({
      }).catch(err => console.log(err)).then (() => message.channel.send("Successfully kicked " + mentionedMember.user.tag));
      } 
  }