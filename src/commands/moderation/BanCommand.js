const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Who do you think You Are ?")
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have \`BAN_MEMBERS\` permission.")

    //variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    //Input Checking
    if (!reason) reason = 'No Reason Given.';
    if (!args[0]) return message.channel.send('You must state someone to ban \`$ban @user reason\`');
    if (!mentionedMember) return message.channel.send('The member mentioned is not in the server. <:1:797814167805100032>');
    if (!mentionedMember.bannable) return message.channel.send('I cannot ban that user. :cry:');

    //Executing:
    const banEmbed = new Discord.MessageEmbed()
    .setTitle(`You Have Been Banned from ${message.guild.name}`)
    .setDescription(`Reasonn For Being Banned: ${reason}`)
    .setColor("#5708ab")
    .setTimestamp();

  await mentionedMember.send(banEmbed).catch(err => console.log(err));
  await mentionedMember.ban({
    days:7,
    reason: reason
  }).catch(err => console.log(err)).then (() => message.channel.send("Successfully banned " + mentionedMember.user.tag));
  }
}