const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`"MANAGE_ROLES"\` permission to execute this command.');

    const muteRole = message.guild.roles.cache.get('797443176611971132');
    const memberRole = message.guild.roles.cache.get('794980186885324811');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(2).join(" ");
    let time = args[1];
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .addField(`Reason: ${reason}`, `Duration: ${time}`)
      .setTimestamp();

    if (!args[0]) return message.channel.send('You must state a member to tempmute. \`-sr tempmute @member time.\`');
    if (!mentionedMember) return message.channel.send("That member is not in the server.");
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.postition) return message.channel.send('This user has a role higher than you so you cannot tempmute them.');
    if (!reason) reason = 'No reason given.';
    if (!time) return message.channel.send('You must state a time to tempmute the mentioned user.');

    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
    await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err));

    setTimeout(async function () {
      await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err));
      await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
      await mentionedMember.send(`Your mute has expired in ${message.guild.name}`).catch(err => console.log(err));
    }, ms(time));
  }
}