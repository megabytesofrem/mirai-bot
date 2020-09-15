import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';

// Import the config file
import * as config from '../config.json';

const token = process.env.TOKEN;

class MiraiClient extends AkairoClient {
  constructor() {
    super({
      // Akairo options
      ownerID: config.owners
    }, {
      // Discord.js options
      disableMentions: 'everyone'
    });

    this.commandHandler = new CommandHandler(this, {
      directory: './src/commands',
      prefix: config.prefix
    });

    // Listeners
    this.listenerHandler = new ListenerHandler(this, {
      directory: './src/listeners'
    });

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();

    // Load all commands
    this.commandHandler.loadAll();
  }
}

const client = new MiraiClient();
client.login(token);