# DiscordDynamicRooms
A discord bot to dinamically create voice rooms

## Configs
* BOT_APITOKEN: Bot token of discord developer application. Required for execution, to login as the given application.
* BOT_REFRESHRATE: Interval between each cycle of creation/deletion of voice channnels. In miliseconds.
* BOT_GUILD_ID: This bot is made to be single-server. This is the server id in which we wish to run the bot.
* CHANNELS_PARENTCATEGORY_USE: True or false. If the bot should create channels in a specific category. If *true*, the *channels.parent_category.id* property must also be set.
* CHANNELS_PARENTCATEGORY_ID: The bot creates voice rooms under a specific category. This is the id of that category.
* CHANNELS_NAMES: A list of names for the bot to use when creating new rooms. The list needs to be delimited by commas (','). Everything written between commas will be used as is.

## Run
1) Copy the .env.example file to a new .env file
2) Update properties to desired values
3) In a console terminal type: 'node start' or 'node ./src/dynamicrooms.js'
    * Requires Node.js to be installed

## ToDo
Init procedure to account for existing channels on bot start up.\
Problem:\
Existing channels are not taken into account on start up. Those chabbels may duplicate the ones in the provided list of channel names.\
Although no error is produced, the server may end up with rooms with duplicated names.\
Solution:\
Create a validation routine on start up. Options:
1) Cleanup the entiry category to enforce a clean start up without any voice channels - This may disconnect users if the bot has an unplanned restart
2) Verify existing channel names and update the internal pool, removing those already existing.

(Maybe also make use of a Map/Set to enforce uniqueness at the collection level (instead of Array))
