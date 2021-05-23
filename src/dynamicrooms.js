require('dotenv').config();
require('console-stamp')(console, '[HH:MM:ss.l]');

const { Client } = require('discord.js');
const client = new Client()
const REFRESH_RATE = process.env.REFRESH_RATE
const PARENT_CATEGORY_ID = process.env.PARENT_CATEGORY_ID

client.login(process.env.BOT_API_TOKEN);

client.on('ready', () => {
  console.log('DiscordDynamicRoom bot turning on');
  setInterval(() => {
    client.guilds
    .fetch(process.env.GUILD_ID, false, false)
    .then(guild => {
      let openVoiceChannels = guild.channels.cache.filter(
        channel => channel.parent &&
                    channel.parent.id === PARENT_CATEGORY_ID &&
                    channel.type === 'voice');
        console.log('openVoiceChannels: ' + openVoiceChannels.array());
        
        let occupiedVoiceChannels = openVoiceChannels.filter(channel => channel.members.size >= 1);
        console.log('nonEmptyVoiceChannels: ' + occupiedVoiceChannels.array());
          
        let emptyVoiceChannels = openVoiceChannels.filter(channel => channel.members.size === 0);
        console.log('emptyVoiceChannels: ' + emptyVoiceChannels.array());
          
        if(emptyVoiceChannels.size === 0) {
          guild.channels
          .create('🔁·', {type: 'voice', parent: PARENT_CATEGORY_ID})
          .then(console.log)
          .catch(err => console.log(channel.name));
        }

        if (emptyVoiceChannels.size > 1 && openVoiceChannels.size > 1) {
          if (emptyVoiceChannels.last()) {
              emptyVoiceChannels.last().delete();
          }
        }
        console.log('---------------------------------')
    })
    .catch(console.log)
  }, REFRESH_RATE)
})

function shutdown() {
    if (client) {
        client.destroy();
    }
    console.log('Shutting down DiscordDynamicRoom bot');
    process.exit();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);