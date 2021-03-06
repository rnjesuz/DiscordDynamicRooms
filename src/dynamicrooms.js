require('dotenv').config();
require('console-stamp')(console, '[HH:MM:ss.l]');

const { Client } = require('discord.js');
const client = new Client();
const REFRESH_RATE = process.env.BOT_REFRESHRATE;
const GUILD_ID = process.env.BOT_GUILD_ID;
const USE_PARENT_CATEGORY = process.env.CHANNELS_PARENTCATEGORY_USE;
const PARENT_CATEGORY_ID = process.env.CHANNELS_PARENTCATEGORY_ID;
const CHANNELS_NAMES = new Set(process.env.CHANNELS_NAMES.split(','));

client.login(process.env.BOT_APITOKEN);

client.on('ready', () => {
  console.log('DiscordDynamicRooms bot turning on');

  startUpSequence();

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
  var channelName = 'Overflow...BeepBoop';
  if(CHANNELS_NAMES.size > 0) {
    var randomIndex = Math.floor(Math.random() * CHANNELS_NAMES.size);
    channelName = Array.from(CHANNELS_NAMES.values())[randomIndex];
  }

  if(USE_PARENT_CATEGORY === 'true' && PARENT_CATEGORY_ID) {
    console.log('Creating new voice channel under parent category ' + PARENT_CATEGORY_ID);
    guild.channels
    .create(channelName, {type: 'voice', parent: PARENT_CATEGORY_ID})
    .then(console.log)
    .catch(err => console.error(channelName, err));
  } else {
    console.log('Creating new voice channel');
    guild.channels
    .create(channelName, {type: 'voice'})
    .then(console.log)
    .catch(err => console.error(channelName, err));
  }
}

function deleteChannel(emptyVoiceChannels) {
  if (emptyVoiceChannels.last()) {
    channel = emptyVoiceChannels.last();
    console.log('Deleting voice channel. id: ' + channel + ', name: ' + channel.name);
    channel.delete();
    CHANNELS_NAMES.add(channel.name);
  }
}

function startUpSequence() {
  client.guilds
    .fetch(GUILD_ID, false, false)
    .then(guild => {      
      let existingGuildChannels = guild.channels.cache.filter(
        channel => filterGuildChannelsOnParentCategory(channel)
      );
      existingGuildChannels.forEach(function(channel) {
        CHANNELS_NAMES.delete(channel.name); 
      });
    });
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