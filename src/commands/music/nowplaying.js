import { info } from 'console';
import { Command, Flag } from 'discord-akairo';
import { errorEmbed, songEmbed } from '../../util/embed';
import { t, MESSAGES, COLOR_DEFAULT } from '../../constants';

// es6-ify this
const child = require('child_process');
const ytdl = require('ytdl-core');

export default class NowPlayingCommand extends Command {
  constructor() {
    super('np', {
      aliases: ['np', 'nowplaying'],
      description: {
        content: MESSAGES.HELP.NOWPLAYING_DESCRIPTION,
        usage: MESSAGES.HELP.NOWPLAYING_USAGE
      },
      category: 'music',
      channel: 'guild',
      args: [
      ],
    });
  }

  async exec(message, args) {
    // Play the song requested
    const queue = this.client.queue[message.guild.id];
    if (!queue) {
        message.channel.send(MESSAGES.MUSIC_NOTHING_PLAYING);
        return;
    }
    
    if (!queue.playing) {
        message.channel.send(MESSAGES.MUSIC_NOTHING_PLAYING);
        return;
    }
    
    let songs = queue.songs;
    let song = songs[0];
    if (!song) {
        message.channel.send(MESSAGES.MUSIC_NOTHING_PLAYING);
        return;
    }
      
    const embed = songEmbed(MESSAGES.MUSIC_NOW_PLAYING_TITLE, song)    
    message.channel.send(embed);
  }
}