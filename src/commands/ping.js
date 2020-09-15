import { Command } from 'discord-akairo';

export default class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: {
        content: 'Ping pong!',
        usage: 'ping'
      },
      category: 'util',
      channel: 'guild',
      args: [
      ],
    });
  }

  async exec(message) {
    return message.reply('pong!');
  }
}
