require('dotenv').config();
require('console-stamp')(console, '[HH:MM:ss.l]');

const { Client } = require('discord.js');
const client = new Client();
const REFRESH_RATE = process.env.BOT_REFRESHRATE;
const GUILD_ID = process.env.BOT_GUILD_ID;
const USE_PARENT_CATEGORY = process.env.CHANNELS_PARENTCATEGORY_USE;
const PARENT_CATEGORY_ID = process.env.CHANNELS_PARENTCATEGORY_ID;
const CHANNELS_NAMES = process.env.CHANNELS_NAMES.split(',');

client.login(process.env.BOT_APITOKEN);

client.on('ready', () => {
  console.log('DiscordDynamicRooms bot turning on');
  setInterval(() => {
    client.guilds
    .fetch(GUILD_ID, false, false)
    .then(guild => {      
      let existingGuildChannels = guild.channels.cache.filter(
        channel => filterGuildChannelsOnParentCategory(channel)
      );
      let emptyVoiceChannels = existingGuildChannels.filter(
        channel => channel.members.size === 0 && channel.type === 'voice'
      );
      
      if(emptyVoiceChannels.size === 0) {
        createChannel(guild);
      }

      if (emptyVoiceChannels.size > 1 && existingGuildChannels.size > 1) {
        deleteChannel(emptyVoiceChannels);
      }
    })
    .catch(console.error)
  }, REFRESH_RATE)
})

function filterGuildChannelsOnParentCategory(channel) {
  if(USE_PARENT_CATEGORY === 'true') {
    return channel.parent && channel.parent.id === PARENT_CATEGORY_ID && channel.type === 'voice';
  } else {
    return !channel.parent && channel.type === 'voice';
  }
}

function createChannel(guild) {
  if(USE_PARENT_CATEGORY === 'true' && PARENT_CATEGORY_ID) {
    console.log('Creating new voice channel under parent category ' + PARENT_CATEGORY_ID);
    guild.channels
    .create('🔁', {type: 'voice', parent: PARENT_CATEGORY_ID})
    .then(console.log)
    .catch(err => console.error(channel.name, err));
  } else {
    console.log('Creating new voice channel');
    guild.channels
    .create('🔁', {type: 'voice'})
    .then(console.log)
    .catch(err => console.error(channel.name, err));
  }
}

function deleteChannel(emptyVoiceChannels) {
  if (emptyVoiceChannels.last()) {
    console.log('Deleting voice channel: ' + emptyVoiceChannels.last() + ';' + emptyVoiceChannels.last().name);
    emptyVoiceChannels.last().delete();
  }
}

function shutdown() {
    if (client) {
        client.destroy();
    }
    console.log('Shutting down DiscordDynamicRooms bot');
    process.exit();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);