# mirai-bot
A fun and friendly server waifu / Discord bot!

## Configuration
Mirai will look for a `.env` file. This file should contain the `TOKEN` like so.
```
# Replace TOKEN with your actual bot token
TOKEN=token here
OWNERS=your id, if selfhosting
```

If for some reason, you don't like using the `.env` file Mirai will also accept the environment variable `TOKEN` being set.

## Self hosting
If you wish to self host Mirai, make sure that the `TOKEN` environment variable is set (as mentioned above)
then run `npm start`. Mirai will first compile its code from ES6/Babel to Node and then start running.

## Invite Mirai to your own server
If you don't wish to self host Mirai, you can find an invite link below to an instance of the bot hosted by me. 
Keep in mind, that many features of the bot are limited and the bot is not 24/7 atm.

https://discord.com/oauth2/authorize?client_id=574381262899511345&permissions=8&scope=bot

## Enviroment Variables

|Variable|Description|Required|
|-|-|-|
|`TOKEN`|Discord bot token.|Yes|
|`PREFIX`|Global prefix, is `m!` by default.|No|
|`PUBLIC_VERSION`|Optional version displayed in `info` command.|No|
|`SOUNDCLOUD_CLIENT_ID`|SoundCloud client ID, required for playing SoundCloud music. Get from network inspector when browsing SoundCloud signed in.|No|