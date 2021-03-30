const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempbanCommand extends BaseCommand {
  constructor() {
    super('tempban', 'moderation', []);
  }

    async run(client, message, args) {
      if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You do not have permission to use this command.');
      if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I require \`"BAN_MEMBERS"\` permission to execute this command.');

      const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      let reason = args.slice(2).join(" ");
      let time = args[1];
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(`You have been banned from ${message.guild.name}`)
        .addField(`Reason: ${reason}`, `Duration: ${time}`)
        .setTimestamp();

      if (!args[0]) return message.channel.send('You must state a member to tempban. \`-sr tempban @member time.\`');
      if (!mentionedMember) return message.channel.send("That member is not in the server.");
      if (!mentionedMember.bannable) return message.channel.send('This member is not bannable');
      if (mentionedMember.roles.highest.position >= message.member.roles.highest.postition) return message.channel.send('This user has a role higher than you so you cannot tempban them.');
      if (!reason) reason = 'No reason given.';
      if (!time) return message.channel.send('You must state a time to tempban the mentioned user.');

      await mentionedMember.send(banEmbed).catch(err => console.log(err));
      await mentionedMember.ban({
        days: 7,
        reason: reason
      }).catch(err => console.error(err)).then (() => message.channel.send("Successfully banned " + mentionedMember.user.tag));;

      setTimeout(async function () {
        await message.guild.fetchBans().then(async bans => {
        if (bans.size == 0) return message.channel.send('This guild does not have any bans.');
        let bannedUser = bans.find(b => b.user.id == mentionedMember.id);
        if (!bannedUser) return console.log('Member unbanned');
        await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err)).then (() => message.channel.send("Successfully unbanned " + mentionedMember.user.tag));
      });
    }, ms(time));
  }
}