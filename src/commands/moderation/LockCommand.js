const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I require \`"MANAGE_CHANNELS"\` permission to execute this command.');

    const role = message.guild.roles.cache.get('781147183050522645');
    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;

    message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false }).catch(err => console.log(err));
    message.channel.send('I have locked the channel :lock:');
  }
}