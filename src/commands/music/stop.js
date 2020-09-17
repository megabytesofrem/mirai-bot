import { Command, Flag } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { errorEmbed } from '../../util/embed';

import { t, MESSAGES } from '../../constants';

export default class StopCommand extends Command {
  constructor() {
    super('stop', {
      aliases: ['stop'],
      description: {
        content: MESSAGES.HELP.STOP_DESCRIPTION,
        usage: MESSAGES.HELP.STOP_USAGE,
      },
      category: 'music',
      channel: 'guild',
      args: [
        {
          id: 'url',
          type: 'string'
        }
      ],
    });
  }

  async exec(message, args) {
    let connection
    try {
      connection = message.guild.voice.connection;

      if (connection.dispatcher) {
        await connection.dispatcher.destroy();
      }
    } catch (err) {
      console.error(err);
      return;
    }
  }
}