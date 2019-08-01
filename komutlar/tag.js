
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    const embed = new Discord.RichEmbed()
    .setAuthor('')
    .setColor("RANDOM")
    .setDescription(`** ${mesaj} ` + message.author.username +         '  Ceza TEAM                          **Tagımız ! ĊĔẐÂ/&Ceza/✵**')
    .setImage(`https://media.giphy.com/media/cLrGTnILzS7vasPkMw/giphy.gif`)
    return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'Tagımızı Atar Ve Ekibe Katılırsın :D',
  usage: 'Tagımızı Alırsın',
};