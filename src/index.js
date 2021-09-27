import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Database, setup, getPrefix, setPrefix } from './database';

const token = process.env.TOKEN;
const globalPrefix = process.env.PREFIX || "m!";

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

    // Queue for the music bot
    this.queue = {};

    this.commandHandler = new CommandHandler(this, {
      directory: './src/commands',
      prefix: message => {
        if (message && message.guild) {
          const prefix = this.db.getPrefixSync(message.guild.id);

          if (prefix !== "") {
            return prefix;
          }
        }
        return globalPrefix;
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
    console.log('Database setup complete');
  }

  async login(token) {
    return super.login(token);
  }
}

const client = new MiraiClient();
client.login(token);