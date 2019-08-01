const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Komutlar")
  .setDescription('')
  .setColor("RANDOM")
  .addField("**Ana Komutlar**", "``!!aşkölçer : Etiketlediğin Kişi İle Arandaki Aşkı Ölçer \n !!balıktut : Balık Tutar \n !!ban : Etiketlenen Kişiyi Banlar.\n !!dmduyuru : Botun Tüm Üyelerine DM den Mesaj Atar\n !!duyuru : Duyurular İsimli Kanala Duyuru Atar\n!!fbi : Fbi Open The Door\n!!fdans : Fortnite Dansı Yapar\n!!hackle : Etiketlediğin Kişiyi Hacklar\n!!nick : Etiketlenen Kişinin Nickini Değiştirir\n!!istatistik : Botun İstatistiklerini Gösterir.\n!!kafadansı : Kafa Dansı Yapar\n!!mazi : Mazi Bir Söz Söyler\n!!rastgele-renk : Rastgele Bir Renk Söyler\n!!sev : Etiketlediğin kişiyi Seversin\n!!sunucubilgi : Sunucunun Bilgisini Verir\n!!tag : Tagımızı Atar\n!!troll : Troll Atar\n!!yala : Dondurma Yalar `` ")
  .addField("**Yapımcı**", " **✵ Ceza Team** ")
  .setFooter('**--------------------------**')
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
