import { Command, Flag } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { errorEmbed } from '../../util/embed';
import { t, MESSAGES } from '../../constants';
import { playFromQueue } from '../../util/musicqueue'

export default class StopCommand extends Command {
  constructor() {
    super('skip', {
      aliases: ['skip'],
      description: {
        content: MESSAGES.HELP.SKIP_DESCRIPTION,
        usage: MESSAGES.HELP.SKIP_USAGE,
      },
      category: 'music',
      channel: 'guild'
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
        message.channel.send(MESSAGES.MUSIC_SKIPPED)
        if (queue) {
            queue.songs.shift();
            await playFromQueue(queue, message);
        }
      }
    } catch (err) {
      console.error(err);
      return;
    }
  }
}