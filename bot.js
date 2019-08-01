const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });

client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-log");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});
  
   };
;

 
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('**Aleyküm selam**');
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'götten sikerim') {
    msg.reply('**Argo Kelime Kullanma**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'orospu çocuğu') {
    msg.reply('**Argo Kelime Kullanma**');
  }  
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oç') {
    msg.reply('**Argo Kelime Kullanma**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Ceza') {
    msg.reply('**Her Daim SİKER**');
  }
if (msg.content === 'selamın aleyküm') {
   	msg.reply('ve aleyküm selam');
  }

  if (msg.content === 'bye bye') {
   	msg.reply('**su gibi git su gibi gel**');
  }

  if (msg.content === 'günaydın') {
   	msg.reply('sana da günaydın');
  }

  if (msg.content === 'herkese günaydın') {
   	msg.reply('yepyeni bir güne merhaba :)');
  }

  if (msg.content === 'iyi geceler') {
   	msg.reply('sana da iyi geceler');
  }

  if (msg.content === 'iyi akşamlar') {
   	msg.reply('**sana da iyi akşamlar**');
  }

  if (msg.content === 'selamın aleyküm') {
   	msg.reply('**ve aleyküm selam**');
  }

  if (msg.content === 'güle güle') {
   	msg.reply('**sana da güle güle**');
  }
  
});




client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
    .setFooter("Gnarge", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});


client.on('guildMemberAdd', member => {
    member.addRole(member.guild.roles.find(r => r.name.startsWith('Üye')));
    const channel = member.guild.channels.find('name', '「📥」gelen-giden '); //burayı istediğiniz kanal ismini yapabilirsiniz!
    if (!channel) return;
   const embed = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
   .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
   .setTitle('✔ Ailemize Hoşgeldin!!')
   .setDescription(`**Sunucuya hoşgeldin, iyi eğlenceler!** \n **Kullanıcı Sayısı: ${member.guild.memberCount}**`)
   .setFooter('RiveN Bot', client.user.avatarURL)
   .setTimestamp()
   channel.send(embed);
   
  });
  
  client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find('name', '「📥」gelen-giden ');
    if (!channel) return;
   const embed = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
   .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
   .setTitle('✘ Sonra Görüşürüz Karşim!!!')
   .setFooter('RiveN Bot', client.user.avatarURL)
   .setTimestamp()
   channel.send(embed);
   
  });

client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});

client.login(ayarlar.token);
