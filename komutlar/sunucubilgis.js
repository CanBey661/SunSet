const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {

	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(':warning: Uyarı :warning:', '`sunucubilgi` adlı komutu özel mesajlarda kullanamazsın.')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setColor(0x49ff00)
    .setTimestamp()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField('➥ **Sunucu Adı:**', ':small_orange_diamond: ' + message.guild.name)
    .addField('➥ **Sunucu ID:**', ':white_small_square: ' + message.guild.id)
    .addField('➥ **Ana kanal:**', ':white_small_square: ' + message.guild.defaultChannel)
    .addField('➥ **Sunucu Bölgesi:**', ':white_small_square: ' + message.guild.region)
    .addField('➥ **Üye sayısı:**', ':white_small_square: ' + message.guild.memberCount)
    .addField('➥ **Sahibi:**', ':white_small_square: ' + message.guild.owner + ' (' + message.guild.ownerID + ')')
    .addField('➥ **Kanal sayısı:**', ':white_small_square: ' + message.guild.channels.size)
    .addField('➥ **Oluşturulma tarihi:**', ':white_small_square: ' + message.guild.createdAt)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu', 'sunucu bilgi', 'sbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'sunucubilgi',
  description: 'Sunucu hakkında bilgi verir.',
  usage: 'sunucubilgi'
};