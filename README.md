# mirai-bot
A fun and friendly server waifu / Discord bot!

## Configuration
Mirai will look for a `config.json` file in the root directory. An example is below, commented
to explain each part (note: JSON doesn't support comments, so these will need to be removed)
```json
{
  "prefix": "m!", // bot prefix, can be changed with setprefix command but wip
  "owners": [""]  // array of owner ids
}
```

## Usage
1. Make sure that the environment variable `TOKEN` is set
2. Run `npm start`, this will transpile the code using `babel` and then run it. Babel is needed since
Mirai is written using modern ES6 Javascript which Node still doesn't support :/.

## Invite Mirai to your own server
If you don't wish to self host Mirai, you can find an invite link below to an instance of the bot hosted by me. 
Keep in mind, that many features of the bot are limited and the bot is not 24/7 atm.

https://discord.com/oauth2/authorize?client_id=574381262899511345&permissions=8&scope=bot