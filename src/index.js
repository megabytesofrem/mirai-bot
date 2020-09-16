import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Database, setup, getPrefix, setPrefix } from './database';

const token = process.env.TOKEN;

class MiraiClient extends AkairoClient {
  constructor() {
    super({
      // Akairo options
      ownerID: process.env.OWNERS,
    }, {
      // Discord.js options
      disableMentions: 'everyone'
    });

    this.setupDatabase();

    this.commandHandler = new CommandHandler(this, {
      directory: './src/commands',
      prefix: message => {
        if (message.guild) {
          const prefix = this.db.getPrefixSync(message.guild.id);

          if (prefix !== "") {
            return prefix;
          }
          else {
            return 'm!';
          }
        }
      }
    });

    // Listeners
    this.listenerHandler = new ListenerHandler(this, {
      directory: './src/listeners'
    });

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler
    });

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();

    // Load all commands
    this.commandHandler.loadAll();
  }

  async setupDatabase() {
    // Setup the database for Mirai
    this.db = new Database();

    console.log('Creating database if it doesn\'t exist..');
    await this.db.setup();
  }

  async login(token) {
    return super.login(token);
  }
}

const client = new MiraiClient();
client.login(token);