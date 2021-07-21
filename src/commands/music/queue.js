import { Command, Flag } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { errorEmbed, musicQueueEmbed } from '../../util/embed';
import { t, MESSAGES } from '../../constants';

export default class StopCommand extends Command {
  constructor() {
    super('queue', {
      aliases: ['queue'],
      description: {
        content: MESSAGES.HELP.QUEUE_DESCRIPTION,
        usage: MESSAGES.HELP.QUEUE_USAGE,
      },
      category: 'music',
      channel: 'guild',
    });
  }

  async exec(message) {
    const queue = this.client.queue[message.guild.id];
    if (!queue || queue.songs.length <= 1) {
        message.channel.send(MESSAGES.MUSIC_QUEUE_EMPTY);
        return;
    }
    
    const embed = musicQueueEmbed(message, queue.songs)
    message.channel.send(embed)
  }
}