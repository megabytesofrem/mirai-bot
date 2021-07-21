import { Command, Flag } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { errorEmbed, musicQueueEmbed } from '../../util/embed';
import { t, MESSAGES } from '../../constants';
import { playFromQueue } from '../../util/musicqueue';
import { timestampToSeconds } from '../../util/units';

export default class StopCommand extends Command {
  constructor() {
    super('goto', {
      aliases: ['goto'],
      description: {
        content: MESSAGES.HELP.GOTO_DESCRIPTION,
        usage: MESSAGES.HELP.GOTO_USAGE,
      },
      category: 'music',
      channel: 'guild',
      args: [
        {
          id: 'position',
          type: 'string'
        }
      ]
    });
  }

  async exec(message, args) {
    const queue = this.client.queue[message.guild.id];
    if (!queue || !queue.playing) {
        message.channel.send(MESSAGES.MUSIC_NOTHING_PLAYING);
        return;
    }
    
    let connection
    try {
      connection = message.guild.voice.connection;

      if (connection && connection.dispatcher) {
        await connection.dispatcher.destroy();
        await playFromQueue(queue, message, args.position);
      }
    } catch (err) {
      console.error(err);
      return;
    }
  }
}