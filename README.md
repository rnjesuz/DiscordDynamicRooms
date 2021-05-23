# DiscordDynamicRooms
A discord bot to dinamically create voice rooms

## Configs
* BOT_TOKEN: Bot token of discord developer application. Required for execution, to login as the given application.
* REFRESH_RATE: Interval between each cycle of creation/deletion of voice channnels. In miliseconds.
* GUILD_ID: This bot is made to be single-server. This is the server id in which we wish to run the bot.
* PARENT_CATEGORY_ID: The bot creates voice rooms under a specific category. This is the id of that category.

## Run
1) Copy the .env.example file to a new .env file
2) Update the configurations to the wanted values
3) In a console terminal type: 'node start' or 'node ./src/dynamicrooms.js'
    * Requires Node.js to be installed

