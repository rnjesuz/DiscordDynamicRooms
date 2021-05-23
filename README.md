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