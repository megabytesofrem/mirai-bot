import { Command } from 'discord-akairo';

import { MESSAGES } from '../constants';

export default class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: {
        content: MESSAGES.HELP.PING_DESCRIPTION,
        usage: MESSAGES.HELP.PING_USAGE
      },
      category: 'util',
      channel: 'guild',
      args: [
      ],
    });
  }

  async exec(message) {
    return message.reply(MESSAGES.PING);
  }
}
