import { Command } from 'discord-akairo';

export default class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: {
        content: 'Ping pong!',
        usage: 'ping'
      },
      args: [
      ],
      category: 'util',
      channel: 'guild',
    });
  }

  async exec(message) {
    return message.reply('pong!');
  }
}
