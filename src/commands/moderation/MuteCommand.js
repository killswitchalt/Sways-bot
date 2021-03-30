const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`"MANAGE_ROLES"\` permission to execute this command.');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('797443176611971132');
    const memberRole = message.guild.roles.cache.get('794980186885324811');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .addField(`Reason for being muted : ${reason}`)
      .setTimestamp();

    if (!args[0]) return message.channel.send('\`-sr mute @member reason`');
    if (!mentionedMember) return message.channel.send('The member stated is not in the server.')
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself.');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot mute me with my own command :joy:.');
    if (!reason) reason = 'No reason given.';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('This member is already muted.')
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot mute someone with the same or higher role than you.');

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));

  }
}