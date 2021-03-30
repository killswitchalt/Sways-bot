const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class ServerinfoCommand extends BaseCommand {
  constructor() {
    super('serverinfo', 'fun', ['server-info', 'server']);
  }

  async run(client, message, args) {
    const infoembed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Server Info")
            .setImage(message.guild.iconURL)
            .setDescription(`${message.guild}'s information`)
            .addField("Owner", `**${message.guild.owner}**`, true)
            .addField("Member Count", `**${message.guild.memberCount}** members`, true)
            .addField("Emoji Count", `**${message.guild.emojis.cache.size}** emojis`, true)
            .addField("Roles Count", `**${message.guild.roles.cache.size}** roles`, true)
            .addField("Channel Count", `**${message.guild.channels.cache.size}** channels`, true)
            .addField("**Date Created**", `Server Created on **${message.guild.createdAt.toLocaleString()}**`)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp();
            

        message.channel.send(infoembed)
  }
}